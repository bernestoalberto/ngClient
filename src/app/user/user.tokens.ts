import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './../store/reducers/auth.reducer';
import * as fromActions from './../store/actions/auth.actions';

export const USER_STORAGE_KEYS = new InjectionToken<keyof fromReducer.AppState[]>('UserStorageKeys');
export const USER_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('UserStorage');
export const USER_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.AppState,
fromActions.AuthActions>>('UserConfigToken');
