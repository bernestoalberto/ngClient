import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './reducers/reports.reducers';
import * as fromActions from './actions/reports.actions';

export const REPORT_STORAGE_KEYS = new InjectionToken<keyof fromReducer.State[]>('ReportStorageKeys');
export const REPORT_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('ReportStorage');
export const REPORT_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.State, fromActions.ReportAction>>('ReportsConfigToken');
