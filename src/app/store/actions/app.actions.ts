import { Action } from '@ngrx/store';

export interface AppModel {
 status: string;
 loadTime?: number;
}


export enum AppTypes {
  Loaded = '[Loaded Page] Loaded',
  LoadedSuccess = '[Loaded Success Page] Loaded Success',
  LoadedFailure = '[Loaded Complete Page] Loaded Failure',
  LoadedComplete = '[Loaded Complete] Loaded Complete',
}

export class Loaded implements Action {
  readonly type = AppTypes.Loaded;

  constructor(public payload: AppModel) {}
}

export class LoadedSuccess implements Action {
  readonly type = AppTypes.LoadedSuccess;

  constructor(public payload: { user: AppModel }) {}
}

export class LoadedComplete implements Action {
  readonly type = AppTypes.LoadedComplete;
}

export type APP_ACTIONS =
  | Loaded
  | LoadedSuccess
  | LoadedSuccess;
