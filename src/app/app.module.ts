import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import {IpayModule} from './ipay/ipay.module'
import {PipesModule} from './shared/pipes/index';


// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';

// Material Modules
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    PipesModule,
    MatTooltipModule,
    MatSidenavModule,
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SharedModule,
    UserModule,
    IpayModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    MatBadgeModule,
    MatCardModule,
    SharedModule,
    MatInputModule,
    PipesModule,
    MatLabel,
    MatProgressBarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
