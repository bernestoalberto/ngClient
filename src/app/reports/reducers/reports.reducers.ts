import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { loadData, loadDataSucccesfuly, loadDataFailed } from '../actions/reports.actions';
import { PieChart } from './../PieChartConfig';
import { ReportAction, ReportsActionTypes } from '../actions/reports.actions';
import * as fromRoot from '../../store/state/app.state';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const statusFeatureKey = 'status';

export interface State extends EntityState<PieChart> {
  report: PieChart | null;
  loading: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  report: State;
}
export const defaultReport: State = {
  ids: [],
  entities: {},
  report: null,
  loading: false,
  error: null
};
export const reportAdapter: EntityAdapter<PieChart> = createEntityAdapter<PieChart>();
export const initialState = reportAdapter.getInitialState(defaultReport);

export const reducer = createReducer(
  initialState,
  on(loadData, (state) => ({ ...state, loading: true })),
  on(loadDataSucccesfuly, (state, { report }) => ({ ...state, report, loading: false })),
  on(loadDataFailed, (state, { error }) => ({ ...state, error, loading: false })),
);

export function reportReducer(state = initialState, action: ReportAction): State {
  switch (action.type) {
    case ReportsActionTypes.LOAD_DATA_SUCCESSFULLY: {
      return {
        ...state,
        report: action.payload.report,
        loading: false
      };
    }
    case ReportsActionTypes.LOAD_DATA_FAILED: {
      return {
        ...state,
        entities: {},
        loading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}

const getReportFeatureState = createFeatureSelector<State>('report');


export const getReport = createSelector(
  getReportFeatureState,
  (state: State) => state.report);

export const getData = createSelector(
  getReportFeatureState,
  (state: State) => state.report.data);

export const getReportConfig = createSelector(
  getReportFeatureState,
  (state: State) => state.report.config);

export const isLoading = createSelector(
  getReportFeatureState,
  (state: State) => state.loading);

export const getElementId = createSelector(
  getReportFeatureState,
  (state: State) => state.report.elementId);

