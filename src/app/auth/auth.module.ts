import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
} from '@angular/material/input';
import {
MatButtonModule,
} from '@angular/material/button';
import {
MatCardModule,
} from '@angular/material/card';
import {
MatDialogModule,
} from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { LoginPageComponent } from './components/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up.component';
import { LoginFormComponent } from './components/login-form.component';
import { LoginComponent } from './components/log-in.component';
import { LogoutDialogComponent } from './components/logout-dialog.component';
import { UserHomeComponent } from '../auth/components/user-home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { StoreModule } from '@ngrx/store';

import { AuthReducer } from '../store/reducers/auth.reducer';
import { AuthEffects } from '../store/effects/auth.effects';
import { RouterModule, Routes } from '@angular/router';
const authRoutes: Routes = [{ path: 'login', component: LoginComponent }];
import { AUTH_LOCAL_STORAGE_KEY, AUTH_STORAGE_KEYS, AUTH_CONFIG_TOKEN } from './auth.tokens';
import { LocalStorageService } from '../shared/localStorage.service';
import { storageMetaReducer } from '../shared/storage.metareducer';

import { BrowserModule } from '@angular/platform-browser';

export function getAuthConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes),
    StoreModule.forFeature('auth', AuthReducer, AUTH_CONFIG_TOKEN),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoginPageComponent,
    SignUpComponent,
    LoginComponent,
    LoginFormComponent,
    LogoutDialogComponent,
    UserHomeComponent
  ],
  entryComponents: [LogoutDialogComponent],
  providers: [AuthService, SignUpComponent, LoginComponent,
    { provide: AUTH_LOCAL_STORAGE_KEY, useValue: '__auth_storage__' },
    { provide: AUTH_STORAGE_KEYS, useValue: ['user', 'viewMode'] },
    {
      provide: AUTH_CONFIG_TOKEN,
      deps: [AUTH_STORAGE_KEYS, AUTH_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getAuthConfig
    }
  ]
})
export class AuthModule { }
