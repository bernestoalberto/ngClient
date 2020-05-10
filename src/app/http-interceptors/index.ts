// #docplaster
// #docregion interceptor-providers
/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// #enddocregion interceptor-providers
// import { AuthInterceptor } from './auth-interceptor';
// #docregion interceptor-providers
// import { NoopInterceptor } from './noop-interceptor';
// #enddocregion interceptor-providers
import {EnsureDomainInterceptor} from './ensure-domain-change-interceptors';
import { UploadInterceptor } from './upload-interceptor';

// import { RepHttpInterceptor } from './http-interceptor-rep';
// import { TrimNameInterceptor } from './trim-name-interceptors';
import { LoggingInterceptor } from './logging-interceptor';
import { ErrorInterceptor } from './auth-interceptor';

/* import { CachingInterceptor } from './caching-interceptor';*/


// #docregion interceptor-providers
// import { EnsureHttpsInterceptor } from './ensure-https-interceptors';
/** Http interceptor providers in outside-in order  */
export const httpInterceptorProviders = [
  // #docregion noop-provider
 // { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  // #enddocregion noop-provider, interceptor-providers

  // { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EnsureDomainInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
 // { provide: HTTP_INTERCEPTORS, useClass: RepHttpInterceptor, multi: true }

 //  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
 //  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  // #docregion interceptor-providers
];
// #enddocregion interceptor-providers
