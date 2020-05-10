import {InjectionToken} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import * as fromReducer from './reducers/media.reducer';
import * as fromActions from './actions/media.actions';

export const MEDIA_STORAGE_KEYS = new InjectionToken<keyof fromReducer.MediaState[]>('MediaStorageKeys');
export const MEDIA_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('MediaStorage');
export const MEDIA_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.MediaState, fromActions.MediaAction>>('MediaConfigToken');
