import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthActions } from '../actions';
import { UserModel } from '../models/user.model';

export const statusFeatureKey = 'status';


export interface State {
  user: UserModel | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
