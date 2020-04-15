import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import * as fromRoot from '../../store/state/app.state';
export interface State {
  pending: boolean;
  error: string | null;
}
export interface AppState extends fromRoot.AppState {
  loginPage: State;
}
// export const authAdapter: EntityAdapter<State> = createEntityAdapter<State>();
export const initialState: State = {
  pending: false,
  error: null
};
// export const initialState = authAdapter.getInitialState(defaultLoginPageState);
export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, pending: true };
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return { ...state, error: action.payload.toString(), pending: false };
    }

    default: {
      return state;
    }
  }
}

export const selectPending = (state: State) => state ? state.pending : null;
export const selectError = (state: State) => state ? state.error : null;

export const selectLoginPageState = createFeatureSelector<State>(
  'loginPage',
);


export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  selectPending,
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  selectError,
);
