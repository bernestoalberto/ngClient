import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserRoutingModule } from './user-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEffects } from './../store/effects/user.effects';
import { UserProfileComponent } from './profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [{ path: 'profile', component: UserProfileComponent }];

import { USER_CONFIG_TOKEN, USER_LOCAL_STORAGE_KEY, USER_STORAGE_KEYS} from './user.tokens';
import {LocalStorageService} from '../shared/localStorage.service';
import {storageMetaReducer} from '../shared/storage.metareducer';

export function getUserConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  declarations: [GoogleSigninDirective, EmailLoginComponent, LoginPageComponent, UserProfileComponent],
  exports: [GoogleSigninDirective],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([UserEffects]),
    RouterModule.forChild(userRoutes),
  ],
  providers: [
    { provide: USER_LOCAL_STORAGE_KEY, useValue: '__user_storage__' },
    { provide: USER_STORAGE_KEYS, useValue: ['user', 'viewMode'] },
    {
      provide: USER_CONFIG_TOKEN,
      deps: [USER_STORAGE_KEYS, USER_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getUserConfig
    }
  ]
})
export class UserModule { }
