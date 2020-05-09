import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, delay } from 'rxjs/operators';
import { loadDataSucccesfuly, loadDataFailed } from '../actions/reports.actions';
import { GooglePieChartService } from './../google-pie-chart.service';
import {  ReportsActionTypes } from '../actions/reports.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private authService: GooglePieChartService,
  ) { }
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActionTypes.LOAD_DATA),
      delay(150),
      map(action => action),
      exhaustMap(_ =>
        this.authService.loadData().pipe(
          map((data) => loadDataSucccesfuly({ report: data })),
          catchError(error => of(loadDataFailed({ error })))
        )
      )
    )
  );

}

