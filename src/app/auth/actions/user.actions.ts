import { createAction, Action } from '@ngrx/store';

export enum UserActionTypes {
  GET_USER = '[Auth] Get user',
  AUTHENTICATED = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  GOOGLE_LOGIN = '[Auth] Google login attempt',
  AUTH_ERROR = '[Auth] Error',
  GOOGLE_LOGOUT = '[Auth] Google Logout',
}
export const idleTimeout = createAction('[User] Idle Timeout');

export const GET_USER = createAction('[Auth] Get user');
export const AUTHENTICATED = createAction('[Auth] Authenticated');
export const NOT_AUTHENTICATED = createAction('[Auth] Not Authenticated');
export const GOOGLE_LOGIN = createAction('[Auth] Google login attempt');
export const GOOGLE_LOGOUT = createAction('[Auth] Logout');
export const AUTH_ERROR = createAction('[Auth] Error');


/// Get User AuthState

export class GetUser implements Action {
  readonly type = UserActionTypes.GET_USER;
  constructor(public payload?: any) { }
}

export class Authenticated implements Action {
  readonly type = UserActionTypes.AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class NotAuthenticated implements Action {
  readonly type = UserActionTypes.NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class AuthError implements Action {
  readonly type = UserActionTypes.AUTH_ERROR;
  constructor(public payload?: any) { }
}

/// Google Login Actions

export class GoogleLogin implements Action {
  readonly type = UserActionTypes.GOOGLE_LOGIN;
  constructor(public payload?: any) { }
}

/// Logout Actions

export class GoogleLogout implements Action {
  readonly type = UserActionTypes.GOOGLE_LOGOUT;
  constructor(public payload?: any) { }
}

export type UserActions =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | GoogleLogin
  | AuthError
  | GoogleLogout;








