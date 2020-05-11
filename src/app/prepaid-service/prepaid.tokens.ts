import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './reducers/prepaid.reducers';
import * as fromActions from './actions/prepaid.actions';

export const PREPAID_STORAGE_KEYS = new InjectionToken<keyof fromReducer.State[]>('PrepaidStorageKeys');
export const PREPAID_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('PrepaidStorage');
export const PREPAID_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.State,
                                        fromActions.PrepaidActions>>('PrepaidConfigToken');
