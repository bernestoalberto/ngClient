import { Action, createAction, props} from '@ngrx/store';

import { Update } from '@ngrx/entity';

import { Media } from '../component/media.model';

export enum MediaActionTypes {
  LOAD_MEDIA = '[Media API] Load Media',
  LOAD_MEDIA_SUCCESS = '[Media] Load Media Success',
  LOAD_MEDIA_FAIL = '[Media] Load Media Fail',
  CREATE_MEDIA = '[Media API] Create Media',
  CREATE_MEDIA_SUCCESS = '[Media] Create Media Success',
  CREATE_MEDIA_FAIL = '[Media] Create Media Fail',
  UPDATE_MEDIA = '[Media API] Update Media',
  UPDATE_MEDIA_SUCCESS = '[Media] Update Media Success',
  UPDATE_MEDIA_FAIL = '[Media] Update Media Fail',
  DELETE_MEDIA = '[Media API] Delete Media',
  DELETE_MEDIA_SUCCESS = '[Media] Delete Media Success',
  DELETE_MEDIA_FAIL = '[Media] Delete Media Fail',
  LOAD_MEDIA_BY_NUMBER = '[Media API] Load Media',
  LOAD_MEDIA_BY_NUMBER_SUCCESS = '[Media] Load Media Success',
  LOAD_MEDIA_BY_NUMBER_FAIL = '[Media] Load Media Fail'
}

// New way (Finish the rest of actions)
export const loadMedia   = createAction('[Media API] Load Media');

export const loadMediaSuccess   = createAction('[Media ] Load Media Success',
                                                props<{medias: any}>()
    );
export const loadMediaFailed   = createAction('[Media ] Load Media Fail',
    props<{error: string}>()
);
// Old way
export class LoadMedia implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA;
}

export class LoadMediaSuccess implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_SUCCESS;

  constructor(public payload: any) { }
}
export class LoadMediaFail implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_FAIL;

  constructor(public payload: string) { }
}
export class LoadMediaByNumber implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_BY_NUMBER;
  constructor(public payload: number) { }
}
export class LoadMediaByNumberSuccess implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_BY_NUMBER_SUCCESS;

  constructor(public payload) { }
}

export class LoadMediaByNumberFail implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_BY_NUMBER_FAIL;

  constructor(public payload: string) { }
}



export class LoadServiceFail implements Action {
  readonly type = MediaActionTypes.LOAD_MEDIA_FAIL;

  constructor(public payload: string) { }
}

export class CreateMedia implements Action {
  readonly type = MediaActionTypes.CREATE_MEDIA;

  constructor(public payload: Media) { }
}

export class CreateMediaSuccess implements Action {
  readonly type = MediaActionTypes.CREATE_MEDIA_SUCCESS;

  constructor(public payload: Media) { }
}

export class CreateMediaFail implements Action {
  readonly type = MediaActionTypes.CREATE_MEDIA_FAIL;

  constructor(public payload: string) { }
}

export class UpdateMedia implements Action {
  readonly type = MediaActionTypes.UPDATE_MEDIA;

  constructor(public payload: Media) { }
}

export class UpdateMediaSuccess implements Action {
  readonly type = MediaActionTypes.UPDATE_MEDIA_SUCCESS;

  constructor(public payload: Update<Media>) { }
}

export class UpdateMediaFail implements Action {
  readonly type = MediaActionTypes.UPDATE_MEDIA_FAIL;

  constructor(public payload: string) { }
}

export class DeleteMedia implements Action {
  readonly type = MediaActionTypes.DELETE_MEDIA;

  constructor(public payload: number) { }
}

export class DeleteMediaSuccess implements Action {
  readonly type = MediaActionTypes.DELETE_MEDIA_SUCCESS;

  constructor(public payload: number) { }
}

export class DeleteMediaFail implements Action {
  readonly type = MediaActionTypes.DELETE_MEDIA_FAIL;

  constructor(public payload: string) { }
}

export type MediaAction =
  | LoadMedia
  | LoadMediaSuccess
  | LoadMediaFail
  | LoadMediaByNumber
  | LoadMediaByNumberSuccess
  | LoadMediaByNumberFail
  | CreateMediaSuccess
  | CreateMediaFail
  | UpdateMedia
  | UpdateMediaSuccess
  | UpdateMediaFail
  | DeleteMedia
  | DeleteMediaSuccess
  | DeleteMediaFail;
