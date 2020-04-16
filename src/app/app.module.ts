// Ng Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Env
import { environment } from '../environments/environment';

// Interceptors
import { httpInterceptorProviders } from './http-interceptors/index';
// Pipes
import { KeysPipe, RoundFullNumber, ReplaceName, OrderBy, Search, UCFirst, UniquePipe } from './app.pipes';

// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import {IpayModule} from './ipay/ipay.module'
import {PipesModule} from './shared/pipes/index';
import { AuthModule } from './auth/auth.module';
// AgGrid
import { AgGridModule } from 'ag-grid-angular';
// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Material Modules
import {MaterialModule} from './material/material.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { CustomSerializer } from './store/reducers/custom-route-serializer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  RouterState
} from '@ngrx/router-store';
import { ROOT_STORAGE_KEYS } from './shared/app.tokens';
import { reducers } from './store';
import { effects } from './store/effects';

// Services
import { RequestCache, RequestCacheWithMap } from './_services/request-cache.service';
import { HttpErrorHandler } from './_services/http-error-handler.service';
import { MessageService } from './_services/message.service';
import { PagerService } from './_services/pageination.service';
import { SnackBarService } from './snackBar/snackBar';
import { AuthService } from './_services/auth.service';
import {MessagingService} from './shared/messaging.service';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  exports: [
    MaterialModule,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    PipesModule,
    SharedModule,
    AuthModule,
    HttpClientXsrfModule,
        /* Pipes */
        KeysPipe,
        ReplaceName,
        RoundFullNumber,
        OrderBy,
        Search,
        UCFirst,
        UniquePipe,
    HttpClientModule,
    CommonModule,
    AgGridModule.withComponents([]),
    MaterialModule,
    UserModule,
    IpayModule,

    StoreModule.forRoot(reducers),
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Moft Admin',
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    //  StoreModule.forFeature('moft', reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    SharedModule,
    PipesModule,
    AuthModule,
    AuthService,
    PagerService,
    SnackBarService,
    httpInterceptorProviders,
    MessageService,
    MessagingService,
    HttpErrorHandler,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: ROOT_STORAGE_KEYS, useValue: ['layout.theme'] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
