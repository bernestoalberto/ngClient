import {
 /* createSelector,
  createFeatureSelector,*/
  Action,
  combineReducers,
} from '@ngrx/store';
import * as fromRoot from './index';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
}

export interface State  {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
  })(state, action);
}
/*
export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);*/
/*
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);*/
/*
export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const selectLoggedIn = createSelector(selectUser, user => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
*/
