import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RepHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // clone request and replace 'https://' with 'http://' at the same time
      let secureReq;
      if (environment.production === false) {
          secureReq = req.clone({
          url: req.url.replace('https://', 'http://')
      });
    } else {
          secureReq = req.clone({
          url: req.url.replace('http://', 'https://')
      });
    }

    // send the cloned, "secure" request to the next handler.
      return next.handle(secureReq);
  }
}
