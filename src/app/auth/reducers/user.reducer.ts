import * as AllActions from '../actions';
import { UserFire } from '../models/user.model';

export type Action = AllActions.UserActions.UserActions;
const USER_ACTION_TYPES = AllActions.UserActions.UserActionTypes;
export const statusFeatureKey = 'status';

const defaultUser = new UserFire(null, 'GUEST');

export interface State {
  user: UserFire | null;
}

export const initialState = {
  user: defaultUser
};


/// Reducer function
export function userReducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case USER_ACTION_TYPES.GET_USER:
      return { ...state, loading: true };

    case USER_ACTION_TYPES.AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case USER_ACTION_TYPES.NOT_AUTHENTICATED:
      return { ...state, ...defaultUser, loading: false };

    case USER_ACTION_TYPES.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case USER_ACTION_TYPES.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };

    case USER_ACTION_TYPES.LOGOUT:
      return { ...state, loading: true };

  }
}

export const getUser = (state: State) => state.user;
