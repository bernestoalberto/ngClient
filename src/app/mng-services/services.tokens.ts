import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './reducers/service.reducer';
import * as fromActions from './actions/service.actions';

export const SERVICES_STORAGE_KEYS = new InjectionToken<keyof fromReducer.ServiceState[]>('ServicesStorageKeys');
export const SERVICES_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('ServicesStorage');
export const SERVICES_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.ServiceState,
fromActions.ServicesAction>>('ServicesConfigToken');
