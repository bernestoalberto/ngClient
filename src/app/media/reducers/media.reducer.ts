import { MediaActions} from '../actions/index';
import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Media } from '../component/media.model';
import * as fromRoot from '../../store/state/app.state';

export const mediaFeatureKey = 'status';
export interface MediaState extends EntityState<Media> {
  selectedMediaId: number | null;
  loading: boolean;
  medias: Array<{}> | null;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  medias: MediaState;
}

export const mediaAdapter: EntityAdapter<Media> = createEntityAdapter<Media>();

export const defaultMedia: MediaState = {
  ids: [],
  entities: {},
  medias: [],
  selectedMediaId: 3,
  loading: false,
  loaded: false,
  error: ''
};
export const initialState = mediaAdapter.getInitialState(defaultMedia);


export const reducer = createReducer(
  initialState,
  on(MediaActions.loadMedia, (state, {  }) => ({ ...state })),
  on(MediaActions.loadMediaSuccess, (state, {medias}) => ({... state, medias: medias.payload.medias})),
  on(MediaActions.loadMediaFailed, (state, {error}) => ({... state, error}))
);
export function mediaReducer(
  state = initialState,
  action: MediaActions.MediaAction
): MediaState {
  switch (action.type) {
    case MediaActions.MediaActionTypes.LOAD_MEDIA_SUCCESS: {
      return {
        ...state,
        medias: action.payload.medias,
        loading: false,
        loaded: true
      };
    }
    case MediaActions.MediaActionTypes.LOAD_MEDIA_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case MediaActions.MediaActionTypes.LOAD_MEDIA_BY_NUMBER_SUCCESS: {
      return mediaAdapter.addOne(action.payload.id, state);
    }
    case MediaActions.MediaActionTypes.LOAD_MEDIA_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case MediaActions.MediaActionTypes.CREATE_MEDIA_SUCCESS: {
      return mediaAdapter.addOne(action.payload, state);
    }
    case MediaActions.MediaActionTypes.CREATE_MEDIA_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case MediaActions.MediaActionTypes.UPDATE_MEDIA_SUCCESS: {
      return mediaAdapter.updateOne(action.payload, state);
    }
    case MediaActions.MediaActionTypes.UPDATE_MEDIA_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case MediaActions.MediaActionTypes.DELETE_MEDIA_SUCCESS: {
      return mediaAdapter.removeOne(action.payload, state);
    }
    case MediaActions.MediaActionTypes.DELETE_MEDIA_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getMediaFeatureState = createFeatureSelector<MediaState>('media');

export const getMedia = createSelector(
  getMediaFeatureState,
  mediaAdapter.getSelectors().selectAll
);
export const fetchMedias = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.medias
);
export const getCantMedia = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.medias.length
);
export const getMediaLoading = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.loading
);

export const getMediaLoaded = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.loaded
);

export const getError = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.error
);

export const getCurrentMediaId = createSelector(
  getMediaFeatureState,
  (state: MediaState) => state.selectedMediaId
);
export const getCurrentMedia = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);

export const selectMediaIds = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);
export const selectMediaEntities = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);

export const selectCurrentMediaId = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);
export const getSelectCurrentMedia = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);
export const selectMediaTotal = createSelector(
  getMediaFeatureState,
  getCurrentMediaId,
  state => state.entities[state.selectedMediaId]
);
