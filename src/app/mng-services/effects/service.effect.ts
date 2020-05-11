import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';

import { IpayService } from '../../ipay/payme/ipay.service';
import * as serviceActions from '../actions/service.actions';
import { Service, ServiceResponse } from '../../mng-services/service.model';

@Injectable()
export class ServiceEffect {
  constructor(
    private actions$: Actions,
    private serviceService: IpayService
  ) {}

  @Effect()
  loadServices$: Observable<Action> = this.actions$.pipe(
    ofType<serviceActions.LoadServices>(
      serviceActions.ServiceActionTypes.LOAD_SERVICES
    ),
    delay(150),
    mergeMap((/*action: serviceActions.LoadServices*/) =>
      this.serviceService.getServices().pipe(
        map(
          (customers: ServiceResponse) => {
           const resp = customers.response.rows;
           return  new serviceActions.LoadServicesSuccess(resp);
          }
        ),
        catchError(err => of(new serviceActions.LoadServicesFail(err)))
      )
    )
  );
  @Effect()
  getNextId$: Observable<any> = this.actions$.pipe(
    ofType<serviceActions.GetNextServiceID>(
      serviceActions.ServiceActionTypes.GET_NEXT_SERVICE_ID
    ),
    mergeMap(() =>
      this.serviceService.getNextServiceID('services').pipe(
        map(
          (serviceId) => of(serviceId)),
        catchError(err => of(new serviceActions.LoadServicesFail(err)))
      )
    )
  );
  @Effect()
  loadService$: Observable<any> = this.actions$.pipe(
    ofType<serviceActions.LoadService>(
      serviceActions.ServiceActionTypes.LOAD_SERVICE
    ),
    mergeMap((action: serviceActions.LoadService) =>
      this.serviceService.getServiceByServiceNo(action.payload).pipe(
        map(
          (customer: Service) =>
            new serviceActions.LoadServiceSuccess(customer)
        ),
        catchError(err => of(new serviceActions.LoadServiceFail(err)))
      )
    )
  );

  @Effect()
  createService$: Observable<any> = this.actions$.pipe(
    ofType<serviceActions.CreateService>(
      serviceActions.ServiceActionTypes.CREATE_SERVICE
    ),
    map((action: serviceActions.CreateService) => action.payload),
    mergeMap((customer: Service) =>
      this.serviceService.createService(customer).pipe(
        map(
          (newService: Service) =>
            new serviceActions.CreateServiceSuccess(newService)
        ),
        catchError(err => of(new serviceActions.CreateServiceFail(err)))
      )
    )
  );

  @Effect()
  updateService$: Observable<any> = this.actions$.pipe(
    ofType<serviceActions.UpdateService>(
      serviceActions.ServiceActionTypes.UPDATE_SERVICE
    ),
    map((action: serviceActions.UpdateService) => action.payload),
    mergeMap((customer: Service) =>
      this.serviceService.updateService(customer).pipe(
        map(
          (updateService: Service) =>
            new serviceActions.UpdateServiceSuccess({
              id: updateService.id,
              changes: updateService
            })
        ),
        catchError(err => of(new serviceActions.UpdateServiceFail(err)))
      )
    )
  );

  @Effect()
  deleteService$: Observable<any> = this.actions$.pipe(
    ofType<serviceActions.DeleteService>(
      serviceActions.ServiceActionTypes.DELETE_SERVICE
    ),
    map((action: serviceActions.DeleteService) => action.payload),
    mergeMap((id: number) =>
      this.serviceService.deleteServices(id).pipe(
        map(() => new serviceActions.DeleteServiceSuccess(id)),
        catchError(err => of(new serviceActions.DeleteServiceFail(err)))
      )
    )
  );
}
