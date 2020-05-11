import { Injectable } from '@angular/core';

// import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
// import { Action } from '@ngrx/store';

// import { Observable, of } from 'rxjs';
// import { map, exhaustMap, tap, mergeMap, catchError } from 'rxjs/operators';

// import * as PrepaidActions from '../actions/prepaid.actions';
// import { Prepaid } from '../prepaid.model';
// import { PrepaidService } from './../prepaid-service.service';

@Injectable()
export class PrepaidEffect {
  constructor(
    // private actions$: Actions,
    // private prepaidService: PrepaidService
  ) { }
/*
  loadPrepaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(prepaidActions.loadPrepaid),
      delay(150),
      map(action => action),
      exhaustMap(_ =>
        this.prepaidService.getPrepaid().pipe(
          map( medias => prepaidActions.PurchaseSuccess({ medias })),
          catchError(error => of(prepaidActions.PurchaseFailed({ error })))
        )
      )
    )
  );


  @Effect()
  loadPrepaidByNumber$: Observable<any> = this.actions$.pipe(
    ofType<prepaidActions.LoadPrepaidByNumber>(
      prepaidActions.PrepaidActionTypes.LOAD_MEDIA_BY_NUMBER
    ),
    mergeMap((action: prepaidActions.LoadPrepaidByNumber) =>
      this.prepaidService.getPrepaidByPrepaidNo(action.payload).pipe(
        map(
          (media: Prepaid[]) =>
            new prepaidActions.LoadPrepaidByNumberSuccess(media)
        ),
        catchError(err => of(new prepaidActions.LoadPrepaidFail(err)))
      )
    )
  );

  @Effect()
  createPrepaid$: Observable<any> = this.actions$.pipe(
    ofType<prepaidActions.CreatePrepaid>(
      prepaidActions.PrepaidActionTypes.CREATE_MEDIA
    ),
    map((action: prepaidActions.CreatePrepaid) => action.payload),
    mergeMap((customer: Prepaid) =>
      this.prepaidService.createPrepaid(customer).pipe(
        map(
          (newPrepaid: Prepaid) =>
            new prepaidActions.CreatePrepaidSuccess(newPrepaid)
        ),
        catchError(err => of(new prepaidActions.CreatePrepaidFail(err)))
      )
    )
  );

  @Effect()
  updatePrepaid$: Observable<any> = this.actions$.pipe(
    ofType<prepaidActions.UpdatePrepaid>(
      prepaidActions.PrepaidActionTypes.UPDATE_MEDIA
    ),
    map((action: prepaidActions.UpdatePrepaid) => action.payload),
    mergeMap((media: Prepaid) =>
      this.prepaidService.updatePrepaid(media).pipe(
        map(
          (updatePrepaid: Prepaid) =>
            new prepaidActions.UpdatePrepaidSuccess({
              id: updatePrepaid.id,
              changes: updatePrepaid
            })
        ),
        catchError(err => of(new prepaidActions.UpdatePrepaidFail(err)))
      )
    )
  );

  @Effect()
  deletePrepaid$: Observable<any> = this.actions$.pipe(
    ofType<prepaidActions.DeletePrepaid>(
      prepaidActions.PrepaidActionTypes.DELETE_MEDIA
    ),
    map((action: prepaidActions.DeletePrepaid) => action.payload),
    mergeMap((id: number) =>
      this.prepaidService.deletePrepaid(id).pipe(
        map(() => new prepaidActions.DeletePrepaidSuccess(id)),
        catchError(err => of(new prepaidActions.DeletePrepaidFail(err)))
      )
    )
  );*/
}
