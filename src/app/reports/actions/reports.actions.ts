import { createAction, props, Action} from '@ngrx/store';
// import { PieChart } from './../PieChartConfig';


export const loadData = createAction('[Report API] Load data for reports');

export const loadDataSucccesfuly = createAction('[Report]  Load data Successfully',
   props<{report: any}>()
);
export const loadDataFailed = createAction('[Report] Load data Failed',
   props<{error: string}>()
);


export enum ReportsActionTypes {
  LOAD_DATA = '[Report API] Load data for reports',
  LOAD_DATA_SUCCESSFULLY = '[Report] Load data Successfully',
  LOAD_DATA_FAILED = '[Report] Load data Failed',
}


export class LoadData implements Action {
  readonly type = ReportsActionTypes.LOAD_DATA;
}
export class LoadDataSucccesfuly implements Action {
  readonly type = ReportsActionTypes.LOAD_DATA_SUCCESSFULLY;

  constructor(public payload: any) { }
}
export class LoadDataFailed implements Action {
  readonly type = ReportsActionTypes.LOAD_DATA_FAILED;

  constructor(public payload: any) { }
}

export type ReportAction =
| LoadData
| LoadDataSucccesfuly
| LoadDataFailed;
