import { Injectable, isDevMode } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { tap } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,  HttpEventType
} from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable()
export class EnsureDomainInterceptor implements HttpInterceptor {
  className = 'WebApiBaseUrlIntercepor';
  constructor() {
  }
  /**
   *
   *  {HttpRequest<any>} req
   *  {HttpHandler} next
   *  { Observable<HttpEvent<any>> }
   */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // the baseURL set in environment folder which has both Dev and Prod
    const url = (!isDevMode()) ? environment.endpoint : environment.debugEndpoint;
    req = req.clone({
      url: url + req.url
    });
    // return next.handle(req);
    // lets add elapse time difference
    const started = Date.now();
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        const elapsed = Date.now() - started;
        console.log(`${this.className}: Request for ${req.urlWithParams} took ${elapsed} ms.`);
      }
    }));
  }
}

