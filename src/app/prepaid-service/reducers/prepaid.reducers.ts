import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as PrepaidActions from '../actions/prepaid.actions';
import { Prepaid } from '../prepaid.model';
import * as fromRoot from '../../store/state/app.state';
export const statusFeatureKey = 'status';


export interface State {
  prepaidService: Prepaid | null;
  loading: boolean;
  errorMessage: string;
}
export interface AppState extends fromRoot.AppState {
  prepaid: State;
}
export const initialState: State = {
  prepaidService: {
    userId: 1,
    amountRequested: 2,
    quantityAvailable: 5,
    date_purchased: '01/03/2020',
    serviceId: 23
  },
  loading: false,
  errorMessage: '',
};

export const reducer = createReducer(
  initialState,
  on(PrepaidActions.purchase, (state, { prepaid }) => ({ ...state, prepaid })),
  on(PrepaidActions.start, () => initialState)
);




export const selectAuthState = createFeatureSelector<State>('prepaid-service');

export const getPrepaidService = createSelector(selectAuthState, (state: State) => state.prepaidService);

export const getPrepaidServiceAmountRequested = createSelector(selectAuthState, (state: State) => state.prepaidService.amountRequested);
export const getPrepaidServiceUserId = createSelector(selectAuthState, (state: State) => state.prepaidService.userId);
export const getPrepaidServiceId = createSelector(selectAuthState, (state: State) => state.prepaidService.serviceId);
export const getPrepaidQuantityAvailable = createSelector(selectAuthState, (state: State) => state.prepaidService.quantityAvailable);
export const getDatePurchased = createSelector(selectAuthState, (state: State) => state.prepaidService.date_purchased);



