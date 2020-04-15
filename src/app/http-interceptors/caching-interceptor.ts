import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders,  HttpResponse, HttpHandler } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheWithMap } from '../_services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheWithMap) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // continue if not cachable.
    if (!this.isCachable(req)) { return next.handle(req); }

    const cachedResponse = this.cache.get(req);
    return cachedResponse ?
      of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  /** Is this request cachable? */
 isCachable(req: HttpRequest<any>) {
  // Only GET requests are cachable
  return req.method === 'GET' &&
    // Only npm package search is cachable in this app
    -1 < req.url.indexOf(req.url);
}

// #docregion send-request
/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
 sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCacheWithMap): Observable<HttpEvent<any>> {

  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });

  return next.handle(noHeaderReq).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    })
  );
}
}
