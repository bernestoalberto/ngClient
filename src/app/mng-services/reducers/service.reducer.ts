import { ServicesAction, ServiceActionTypes } from '../actions/service.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Service } from '../../mng-services/service.model';
import * as fromRoot from '../../store/state/app.state';


export interface ServiceState extends EntityState<Service> {
  selectedServiceId: number | null;
  loading: boolean;
  services: Array<{}> | [];
  error: string;
}

export interface AppState extends fromRoot.AppState {
  services: ServiceState;
}

export const serviceAdapter: EntityAdapter<Service> = createEntityAdapter<Service>();

export const defaultService: ServiceState = {
  ids: [],
  entities: {},
  services: [],
  selectedServiceId: null,
  loading: false,
  error: ''
};

export const initialState = serviceAdapter.getInitialState(defaultService);

export function serviceReducer(state = initialState, action: ServicesAction): ServiceState {
  switch (action.type) {
    case ServiceActionTypes.LOAD_SERVICES_SUCCESS: {
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    }
    case ServiceActionTypes.LOAD_SERVICES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        error: action.payload
      };
    }

    case ServiceActionTypes.LOAD_SERVICE_SUCCESS: {
      return serviceAdapter.addOne(action.payload, {
        ...state,
        selectedServiceId: action.payload.id
      });
    }
    case ServiceActionTypes.LOAD_SERVICE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ServiceActionTypes.CREATE_SERVICE_SUCCESS: {
      return serviceAdapter.addOne(action.payload, state);
    }
    case ServiceActionTypes.CREATE_SERVICE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ServiceActionTypes.UPDATE_SERVICE_SUCCESS: {
      return serviceAdapter.updateOne(action.payload, state);
    }
    case ServiceActionTypes.UPDATE_SERVICE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ServiceActionTypes.DELETE_SERVICE_SUCCESS: {
      return serviceAdapter.removeOne(action.payload, state);
    }
    case ServiceActionTypes.DELETE_SERVICE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ServiceActionTypes.GET_NEXT_SERVICE_ID: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }

    default: {
      return state;
    }
  }
}

const getServiceFeatureState = createFeatureSelector<ServiceState>('services');

export const getServices = createSelector(
  getServiceFeatureState,
  (state: ServiceState) => state.services
);
export const getCantServices = createSelector(
  getServiceFeatureState,
  (state: ServiceState) => state.services.length
);
export const getServicesLoading = createSelector(
  getServiceFeatureState,
  (state: ServiceState) => state.loading
);

export const getError = createSelector(
  getServiceFeatureState,
  (state: ServiceState) => state.error
);

export const getCurrentServiceId = createSelector(
  getServiceFeatureState,
  (state: ServiceState) => state.selectedServiceId
);
export const getCurrentService = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);

export const selectServiceIds = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);
export const selectServiceEntities = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);

export const selectCurrentServiceId = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);
export const getSelectCurrentService = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);
export const selectServiceTotal = createSelector(
  getServiceFeatureState,
  getCurrentServiceId,
  state => state.entities[state.selectedServiceId]
);
