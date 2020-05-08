import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReportsComponent } from './reports.component';
import { PieChartComponent } from './components/piechart.component';
import { GooglePieChartService } from './google-pie-chart.service';

import {MatProgressBarModule } from '@angular/material/progress-bar';

import { GoogleChartsBaseService } from './google-charts.base.service';
const reportRoutes: Routes = [{path: 'reports', component: ReportsComponent}];
import { REPORT_CONFIG_TOKEN, REPORT_LOCAL_STORAGE_KEY, REPORT_STORAGE_KEYS} from './reports.tokens';
import {LocalStorageService} from '../shared/localStorage.service';
import {storageMetaReducer} from '../shared/storage.metareducer';

import * as  reportReducer from './reducers/reports.reducers';
import * as  reportEffects from './effects/reports.effects';

export function getReportConfig(saveKeys: string[], localStorageKey: string, storageService: LocalStorageService) {
  return { metaReducers: [storageMetaReducer(saveKeys, localStorageKey, storageService)] };
}

@NgModule({
  declarations: [ReportsComponent, PieChartComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    RouterModule.forChild(reportRoutes),
    StoreModule.forFeature('report', reportReducer.reducer, REPORT_CONFIG_TOKEN),
    EffectsModule.forFeature([reportEffects.ReportEffects]),
  ],
     providers: [GoogleChartsBaseService, GooglePieChartService,
    { provide: REPORT_LOCAL_STORAGE_KEY, useValue: '__reports_storage__' },
    { provide: REPORT_STORAGE_KEYS, useValue: ['report', 'viewMode'] },
    {
      provide: REPORT_CONFIG_TOKEN,
      deps: [REPORT_STORAGE_KEYS, REPORT_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getReportConfig
    }
  ]
})
export class ReportsModule { }
