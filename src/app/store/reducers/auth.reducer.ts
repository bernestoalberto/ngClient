import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import * as fromRoot from '../state/app.state';
import { UserModel, UserNotification, UserFire } from '../../auth/models/user.model';

export interface AuthState extends EntityState<any> {
  // is a user authenticated?
  isAuthenticated: boolean;
  userNotification: UserNotification[] | null;
  token: string;
  // if authenticated, there should be a user object
  user: UserModel | null;
  userFire: UserFire | null;
  // error message
  errorMessage: string | null;
  isLoading: boolean;
  loggedIn: boolean;
  hasError: boolean;
}
export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}

export const authAdapter: EntityAdapter<AuthState> = createEntityAdapter<AuthState>();

export const defaultAuthState: AuthState = {
  ids: [],
  entities: {},
  token: '',
  user: null,
  userFire: null,
  userNotification: null,
  isAuthenticated: false,
  loggedIn: false,
  isLoading: false,
  hasError: false,
  errorMessage: null
};

export const initialState = authAdapter.getInitialState(defaultAuthState);

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        ...state,
        hasError: false,
        errorMessage: null,
        loggedIn: false,
        isLoading: true
      };
    case AuthActionTypes.TokenRefreshed:
      return {
        ...state,
        token: action.payload
      };
      case AuthActionTypes.LoginFireBase:
        return {
          ...state,
          hasError: false,
          errorMessage: null,
          loggedIn: false,
          isLoading: true
        };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        user:  {
          first_name: action.payload.user.first_name,
          email: action.payload.user.email,
          profile_path: action.payload.user.profile_path,
          token: action.payload.user.token,
        },
        isAuthenticated: true,
        hasError: false,
        errorMessage: null,
        loggedIn: true,
        isLoading: false

      };
    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        errorMessage: action.payload.toString(),
        hasError: true,
        loggedIn: false,
        isLoading: false,
      };
      case AuthActionTypes.SignUpEmailFire: {
        return {
          ...state,
          isLoading: true
        };
      }
      case AuthActionTypes.SignUp:
        return {
          ...state,
          isLoading: true
        };
    case AuthActionTypes.SignUpFailure: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.SignUpSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.user.token,
          email: action.payload.user.email,
          first_name: action.payload.user.first_name
        },
        errorMessage: null
      };
    }   case AuthActionTypes.LogoutConfirmed:
    return {
      ...state,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
      isLoading: true
    };
    case AuthActionTypes.LogoutComplete: {
      return initialState;
    }
    default:
      return state;
  }
}
export const selectAuthState = createFeatureSelector<AuthState>('user');
export const selectUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.loggedIn);
export const getToken = createSelector(selectAuthState, (state: AuthState) => state.user.token);
export const selectIsLoggedIn = createSelector(selectAuthState, user => !!user);
export const errorMessage = createSelector(selectAuthState, (state: AuthState) => state.errorMessage);
export const hasError = createSelector(selectAuthState, (state: AuthState) => state.hasError);
export const isLoading = createSelector(selectAuthState, (state: AuthState) => state.isLoading);
export const getCantUserNotifications = createSelector(selectAuthState, (state: AuthState) =>
state.userNotification ? state.userNotification.length : 0);
export const getBadgeVisibility = createSelector(selectAuthState, (state: AuthState) =>
state.userNotification ? state.userNotification.length  > 1 ? true : false : false);
export const getUserNotifications = createSelector(selectAuthState, (state: AuthState) => state.userNotification);
