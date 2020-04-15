import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { from } from 'rxjs';
import { serviceReducer } from '../mng-services/reducers/service.reducer';
import { ServiceEffect } from '../mng-services/effects/service.effect';

import { MngServicesComponent } from './mng-services.component';
import { NewServicesComponent } from './new-services/new-services.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import {DeleteServiceComponent} from './delete-service/delete-service.component';

// Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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

// import {PackageSearchModule} from '../package-search/package-search.module';

// const serviceRoutes: Routes = [{ path: 'services', component: MngServicesComponent }];
import { ServicesRoutingModule } from './service-routing.module';
import { SERVICES_CONFIG_TOKEN, SERVICES_LOCAL_STORAGE_KEY, SERVICES_STORAGE_KEYS} from './services.tokens';
import {LocalStorageService} from '../shared/localStorage.service';
import {storageMetaReducer} from '../shared/storage.metareducer';
import { AgGridModule } from 'ag-grid-angular';

export function getServicesConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  entryComponents: [
    MngServicesComponent,
    NewServicesComponent,
    EditServicesComponent,
    DeleteServiceComponent
  ],
  imports: [
  CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    // PackageSearchModule,
    MatBadgeModule,
    // RouterModule.forChild(serviceRoutes),
    StoreModule.forFeature('services', serviceReducer, SERVICES_CONFIG_TOKEN),
    EffectsModule.forFeature([ServiceEffect]),
    AgGridModule.withComponents([MngServicesComponent]),
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatLabel,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ServicesRoutingModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatRadioModule
  ],
  providers: [
    MaterialElevationDirective,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDividerModule,
    MatCardModule,
    MatLabel,
    { provide: SERVICES_LOCAL_STORAGE_KEY, useValue: '__services_storage__' },
    { provide: SERVICES_STORAGE_KEYS, useValue: ['services', 'viewMode'] },
    {
      provide: SERVICES_CONFIG_TOKEN,
      deps: [SERVICES_STORAGE_KEYS, SERVICES_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getServicesConfig
    }
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
