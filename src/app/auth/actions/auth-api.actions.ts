import { props, createAction } from '@ngrx/store';
import { UserModel } from './../models/user.model';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: UserModel }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');
