import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepaidServiceComponent } from './prepaid-service.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { PrepaidService } from './prepaid-service.service';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers/prepaid.reducers';
import { PrepaidEffect } from './effects/prepaid.effects';
import { RouterModule, Routes } from '@angular/router';
const   prepaidRoutes: Routes = [{ path: 'prepaid', component: PrepaidServiceComponent }];

import { PREPAID_CONFIG_TOKEN, PREPAID_LOCAL_STORAGE_KEY, PREPAID_STORAGE_KEYS} from './prepaid.tokens';
import {LocalStorageService} from '../shared/localStorage.service';
import {storageMetaReducer} from '../shared/storage.metareducer';


export function getPrepaidConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  declarations: [PrepaidServiceComponent],
  imports: [
  CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    RouterModule.forChild(prepaidRoutes),
    StoreModule.forFeature('prepaid_service', reducer, PREPAID_CONFIG_TOKEN),
    EffectsModule.forFeature([PrepaidEffect]),
   ],  providers: [
    PrepaidService,
    { provide: PREPAID_LOCAL_STORAGE_KEY, useValue: '__prepaid_service_storage__' },
    { provide: PREPAID_STORAGE_KEYS, useValue: ['prepaidService', 'viewMode'] },
    {
      provide: PREPAID_CONFIG_TOKEN,
      deps: [PREPAID_STORAGE_KEYS, PREPAID_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getPrepaidConfig
        }
  ]
})
export class PrepaidServiceModule { }
