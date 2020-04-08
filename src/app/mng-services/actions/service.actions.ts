import { Action /*createAction, , props */ } from '@ngrx/store';

import { Update /*, EntityState, Predicate, EntityAdapter, EntityMap, createEntityAdapter*/ } from '@ngrx/entity';

import { Service } from '../../mng-services/service.model';

export enum ServiceActionTypes {
  LOAD_SERVICES = '[ Load Services API] Load Services',
  LOAD_SERVICES_SUCCESS = '[Load Services Successfully] Load Services Successfully',
  LOAD_SERVICES_FAIL = '[Load Services Failed] Load Services Fail',
  LOAD_SERVICE = '[Load a Service API] Load a Service',
  LOAD_SERVICE_SUCCESS = '[Load a Service Success] Load a Service Success',
  LOAD_SERVICE_FAIL = '[Load a Service Fail] Load Service Fail',
  CREATE_SERVICE = '[Create a Service API] Create a Service',
  CREATE_SERVICES = '[Create Services] Create Services',
  CREATE_SERVICE_SUCCESS = '[Create a Service] Create Service Successfully',
  CREATE_SERVICE_FAIL = '[Create a Service] Create Service Failed',
  UPDATE_SERVICE = '[Updata a Service API] Update Service',
  UPDATE_SERVICE_SUCCESS = '[Updata a Service successfully] Update Service Successfully',
  UPDATE_SERVICE_FAIL = '[Updata a Service failed] Update Service Failed',
  DELETE_SERVICE = '[Delete a Service API] Delete a Service',
  DELETE_SERVICE_SUCCESS = '[Delete Service sucessfully] Delete Service Successfully',
  DELETE_SERVICE_FAIL = '[Delete a Service FAILED] Delete Service Failed',
  GET_NEXT_SERVICE_ID = '[GET_NEXT_SERVICE_ID] Get the next service id'
}


export class LoadServices implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICES;
}

export class LoadServicesSuccess implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICES_SUCCESS;

  constructor(public payload: Service[]) { }
}

export class LoadServicesFail implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICES_FAIL;

  constructor(public payload: string) { }
}

export class LoadService implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICE;

  constructor(public payload: number) { }
}

export class LoadServiceSuccess implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICE_SUCCESS;

  constructor(public payload: Service) { }
}

export class LoadServiceFail implements Action {
  readonly type = ServiceActionTypes.LOAD_SERVICE_FAIL;

  constructor(public payload: string) { }
}
export class GetNextServiceID implements Action {
 readonly type = ServiceActionTypes.GET_NEXT_SERVICE_ID;
}
export class CreateService implements Action {
  readonly type = ServiceActionTypes.CREATE_SERVICE;

  constructor(public payload: Service) { }
}
export class CreateServices implements Action {
  readonly type = ServiceActionTypes.CREATE_SERVICES;

  constructor(public payload: Service[]) { }
}
export class CreateServiceSuccess implements Action {
  readonly type = ServiceActionTypes.CREATE_SERVICE_SUCCESS;

  constructor(public payload: Service) { }
}

export class CreateServiceFail implements Action {
  readonly type = ServiceActionTypes.CREATE_SERVICE_FAIL;

  constructor(public payload: string) { }
}

export class UpdateService implements Action {
  readonly type = ServiceActionTypes.UPDATE_SERVICE;

  constructor(public payload: Service) { }
}

export class UpdateServiceSuccess implements Action {
  readonly type = ServiceActionTypes.UPDATE_SERVICE_SUCCESS;

  constructor(public payload: Update<Service>) { }
}

export class UpdateServiceFail implements Action {
  readonly type = ServiceActionTypes.UPDATE_SERVICE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteService implements Action {
  readonly type = ServiceActionTypes.DELETE_SERVICE;

  constructor(public payload: number) { }
}

export class DeleteServiceSuccess implements Action {
  readonly type = ServiceActionTypes.DELETE_SERVICE_SUCCESS;

  constructor(public payload: number) { }
}

export class DeleteServiceFail implements Action {
  readonly type = ServiceActionTypes.DELETE_SERVICE_FAIL;

  constructor(public payload: string) { }
}

export type ServicesAction =
  | LoadServices
  | LoadServicesSuccess
  | LoadServicesFail
  | LoadService
  | LoadServiceSuccess
  | LoadServiceFail
  | CreateService
  | CreateServiceSuccess
  | CreateServiceFail
  | UpdateService
  | UpdateServiceSuccess
  | UpdateServiceFail
  | DeleteService
  | DeleteServiceSuccess
  | DeleteServiceFail
  | GetNextServiceID;
