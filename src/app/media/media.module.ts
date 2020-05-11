
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';


import { MediaComponent } from './component/media.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule } from '@angular/material/list';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogComponent } from './component/container/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './component/media.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { mediaReducer } from './reducers/media.reducer';
import { MediaEffect } from './effects/media.effect';
import { RouterModule, Routes } from '@angular/router';
const mediaRoutes: Routes = [{ path: 'media', component: MediaComponent }];

import { MEDIA_CONFIG_TOKEN, MEDIA_LOCAL_STORAGE_KEY, MEDIA_STORAGE_KEYS } from './media.tokens';
import { LocalStorageService } from '../shared/localStorage.service';
import { storageMetaReducer } from '../shared/storage.metareducer';

import { AgGridModule } from 'ag-grid-angular';
import {PackageSearchModule} from '../package-search/package-search.module';


export function getMediaConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    PackageSearchModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(mediaRoutes),
    AgGridModule.withComponents([MediaComponent,
      //  ActionRendererComponent
    ]),
    StoreModule.forFeature('media', mediaReducer, MEDIA_CONFIG_TOKEN),
    EffectsModule.forFeature([MediaEffect]),
  ],
  declarations: [MediaComponent, DialogComponent],
  exports: [MediaComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [
    UploadService,
    AgGridModule,
    { provide: MEDIA_LOCAL_STORAGE_KEY, useValue: '__media_storage__' },
    { provide: MEDIA_STORAGE_KEYS, useValue: ['medias', 'viewMode'] },
    {
      provide: MEDIA_CONFIG_TOKEN,
      deps: [MEDIA_STORAGE_KEYS, MEDIA_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getMediaConfig
    }

  ]
})
export class MediaModule { }
