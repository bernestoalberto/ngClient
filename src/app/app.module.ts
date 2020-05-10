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
import { KeysPipe }  from './pipes/keys.pipe';
import { AddCommasPipe } from './pipes/add-commas.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { RoundFullNumber } from './pipes/round.full-number.pipe';
import { ReplaceName } from './pipes/replace.name.pipe';
import { OrderBy } from './pipes/orderby.pipe';
import { Search } from './pipes/search.pipe';
import { UCFirst } from './pipes/ucfirst.pipe';
import { UniquePipe } from './pipes/unique.pipe';

// App Modules
import { AppComponent } from './app.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import  {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import {IpayModule} from './ipay/ipay.module';
import {ServicesModule} from './mng-services/mng-services.module';
import { AuthModule } from './auth/auth.module';
import {ReportsModule} from './reports/reports.module';
import {EventModule} from './calendar/event.module';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { TaxComponent } from './tax/tax.component';
import {HelpModule} from './help/help.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { DownloaderComponent } from './downloader/downloader.component';
import {PackageSearchModule} from './package-search/package-search.module';
import { MediaModule } from './media/media.module';
import { PrepaidServiceModule } from './prepaid-service/prepaid-service.module';
import { QuicklinkModule } from 'ngx-quicklink';
// AgGrid
import { AgGridModule } from 'ag-grid-angular';
// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Material Modules
import {MaterialModule} from './material/material.module';

import {TranslateModule} from '@ngx-translate/core';
import { MapModule } from './map/map.module';

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
    BreadcrumbComponent,
    CheckoutComponent,
    DownloaderComponent,
    DashBoardComponent,
    TaxComponent,
      /* Pipes */
        KeysPipe,
        ReplaceName,
        RoundFullNumber,
        AddCommasPipe,
        EllipsisPipe,
        OrderBy,
        Search,
        UCFirst,
        UniquePipe,
  ],
  exports: [
    MaterialModule,
  ],
  imports: [
  CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MapModule,
    HelpModule,
    TranslateModule.forRoot(),
    PackageSearchModule,
    EventModule,
    MediaModule,
    PrepaidServiceModule,
    QuicklinkModule,
    BreadcrumbModule,
    BrowserAnimationsModule,
    SharedModule,
    ServicesModule,
    AuthModule,
    ReportsModule,
    HttpClientXsrfModule,
    HttpClientModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    SharedModule,
    AuthModule,
    AuthService,
    PagerService,
    SnackBarService,
    BreadcrumbComponent,
    httpInterceptorProviders,
    DashBoardComponent,
    PackageSearchModule,
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
