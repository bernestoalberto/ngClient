// import * as mediaStore from '../../media/state/media.state';
import * as serviceStore from '../../mng-services/state/service.state';
// import * as authStore from '../reducers/auth.reducer';
// import * as userStore from '../../auth/reducers/user.reducer';
// import * as prepaidStore from '../../prepaid-service/reducers/prepaid.reducers';
import * as layoutStore from '../reducers/layout.reducer';
// import * as reportStore from '../../reports/reducers/reports.reducers';
export interface AppState {
  service: serviceStore.State;
  // user: userStore.State;
  // auth: authStore.AuthState;
  // media?: mediaStore.State;
  // prepaid: prepaidStore.State;
  shell: layoutStore.State;
  // report: reportStore.State;
}
export interface FeatureState {
  counter: number;
}

export const initialState: AppState = {
  service: serviceStore.initialState,
  // media: mediaStore.initialState,
  // auth: authStore.initialState,
  // user: userStore.initialState,
  // prepaid: prepaidStore.initialState,
  shell: layoutStore.initialState,
  // report: reportStore.initialState
};

export const getMyService = (s: AppState) => s.service;
// export const getMyUser = (s: AppState) => s.user;
// export const getMyMedia = (s: AppState) => s.media;






