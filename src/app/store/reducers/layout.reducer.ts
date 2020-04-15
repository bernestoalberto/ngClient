import { createReducer, on } from '@ngrx/store';

import { LayoutActions } from '../actions';
// import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromRoot from '../../store/state/app.state';
export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
  theme: 'primary' | 'success';
}
export interface AppState extends fromRoot.AppState {
  layout: State;
}

export const initialState: State = {
  showSidenav: false,
  theme: 'primary'
};

export const reducer = createReducer(
  initialState,
  // Even thought the `state` is unused, it helps infer the return type
  on(LayoutActions.closeSidenav, state => ({ showSidenav: false, theme: 'primary' })),
  on(LayoutActions.openSidenav, state => ({ showSidenav: true, theme: 'primary' })),
  // on(AuthActions.logoutConfirmation , state => ({ showSidenav: false , theme: 'primary' }))
);

export const selectShowSidenav = (state: State) => state.showSidenav;
