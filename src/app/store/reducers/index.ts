import {
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  // Action,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from '../reducers/auth.reducer';
import { RouterStateUrl } from '../reducers/custom-route-serializer';
// import * as fromRouter from '@ngrx/router-store';
import * as fromLoginPage from './login-page.reducer';

export interface State {
  auth: fromAuth.AuthState;
  loginPage: fromLoginPage.State;
  router: RouterReducerState<RouterStateUrl>;
}

// Reducer selectors
export const selectReducerState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getRouterInfo = createSelector(
  selectReducerState,
  state => state.state
);
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.AuthReducer,
 loginPage: fromLoginPage.reducer,
 router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
 ? []
 : [];

 // console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

// import * as fromLayout from '@ng_admin_moft/core/reducers/layout.reducer';

// import { InjectionToken } from '@angular/core';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
/*export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}*/

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */

/*export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});*/




/**
 * Layout Reducers
 */

/*
 export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
  'layout'
);

export const selecthowSidenav = createSelector(
  selectLayoutState,
  fromLayout.selectShowSidenav
);
*/
