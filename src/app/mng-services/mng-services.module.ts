import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { serviceReducer } from '../mng-services/reducers/service.reducer';
import { ServiceEffect } from '../mng-services/effects/service.effect';

import { MngServicesComponent } from './mng-services.component';
import { NewServicesComponent } from './new-services/new-services.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {PackageSearchModule} from '../package-search/package-search.module';

const serviceRoutes: Routes = [{ path: 'services', component: MngServicesComponent }];

import { SERVICES_CONFIG_TOKEN, SERVICES_LOCAL_STORAGE_KEY, SERVICES_STORAGE_KEYS} from './services.tokens';
import {LocalStorageService} from '../shared/localStorage.service';
import {storageMetaReducer} from '../shared/storage.metareducer';
import { AgGridModule } from 'ag-grid-angular';

export function getServicesConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

import { MaterialElevationDirective } from '../shared/material-elevation.directive';

import {
  MatCardModule,
} from '@angular/material/card';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MatBadgeModule,
} from '@angular/material/badge';
import {
  MatRadioModule,
} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { DeleteServiceComponent } from './delete-service/delete-service.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // PackageSearchModule,
    MatBadgeModule,
    RouterModule.forChild(serviceRoutes),
    StoreModule.forFeature('services', serviceReducer, SERVICES_CONFIG_TOKEN),
    EffectsModule.forFeature([ServiceEffect]),
    AgGridModule.withComponents([MngServicesComponent]),
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatRadioModule
  ],
  providers: [
    MaterialElevationDirective,
    { provide: SERVICES_LOCAL_STORAGE_KEY, useValue: '__services_storage__' },
    { provide: SERVICES_STORAGE_KEYS, useValue: ['services', 'viewMode'] },
    {
      provide: SERVICES_CONFIG_TOKEN,
      deps: [SERVICES_STORAGE_KEYS, SERVICES_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getServicesConfig
    }
  ],
    entryComponents: [
      MngServicesComponent,
      NewServicesComponent,
      EditServicesComponent,
      DeleteServiceComponent
    ],
  exports: [

  ],
  declarations: [
    MngServicesComponent,
    NewServicesComponent,
    EditServicesComponent,
    DeleteServiceComponent,
    MaterialElevationDirective
  ]
})
export class ServicesModule {}
