import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Login Page API] Login',
  LoginFireBase = '[LoginFireBase] Google Login FireBase',
  LoginSuccess = '[Login Success ] Login Success on Backend',
  LoginRedirect = '[Login Redirect] Login Redirected',
  LoginFailure = '[Login Failure ] Login Failure',
  LoginErrorRedirect = '[Login Error Redirect] Login Error Redirect',
  SignUpEmailFire = '[SignUp Fire API] SignUp Email Fire',
  SignUp = '[Sign Up API] SignUp User',
  SignUpSuccess = '[SignUp Success ] Login Success on Backend',
  SignUpFailure = '[SignUp Failure ] Login Failure',
  GetToken = '[Get Token API] Token from Endpoint ',
  TokenRefreshed = '[Token Refreshed ] Refreshed The Token ',
  TokenFailure = '[Token Failure] Get Token Failure',
  SetLogoutTimer = '[LogoutTimer] Set Logout Timer',
  Logout = '[Logout Init] Logout Process Started',
  LogoutCancelled = '[Logout Cancelled] Logout Cancelled',
  LogoutConfirmed = '[Logout Confirmed API] Logout Confirmed',
  LogoutComplete = '[Logout Complete ] Logout Complete'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: any) { }
}
export class LoginFireBase implements Action {
  readonly type = AuthActionTypes.LoginFireBase;
  constructor(public payload: any) { }
}
export class GetToken implements Action {
  readonly type = AuthActionTypes.GetToken;
}
export class TokenRefreshed implements Action {
  readonly type = AuthActionTypes.TokenRefreshed;
  constructor(public payload: any) { }
}
export class TokenFailure implements Action {
  readonly type = AuthActionTypes.TokenFailure;
  constructor(public payload: any) { }
}
export class LoginErrorRedirect implements Action {
  readonly type = AuthActionTypes.LoginErrorRedirect;
}
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: any) { }
}
export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) { }
}
export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class SetLogoutTimer implements Action {
  readonly type = AuthActionTypes.SetLogoutTimer;
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LogoutConfirmed;
}

export class LogoutCancelled implements Action {
  readonly type = AuthActionTypes.LogoutCancelled;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SignUp;
  constructor(public payload: any) { }
}
export class SignUpEmailFire implements Action {
  readonly type = AuthActionTypes.SignUpEmailFire;
  constructor(public payload: any) { }
}
export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SignUpSuccess;
  constructor(public payload: any) { }
}
export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SignUpFailure;
  constructor(public payload: any) { }
}

export type AuthActions =
  | Login
  | LoginFireBase
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | GetToken
  | TokenRefreshed
  | TokenFailure
  | Logout
  | SetLogoutTimer
  | LogoutCancelled
  | LogoutConfirmed
  | LogoutComplete
  | LoginErrorRedirect
  | SignUp
  | SignUpEmailFire
  | SignUpSuccess
  | SignUpFailure;
