import { createAction, Action, props } from '@ngrx/store';
import { Prepaid } from '../prepaid.model';

export const backwards = createAction('[Backwards] Backwards');
export const purchase = createAction('[Purchase] Purchase',
  props<{ prepaid: Prepaid[] }>());
export const forward = createAction('[Backwards] Backwards');
export const final = createAction('[Final] Final');
export const start = createAction('[Start] Start');

export enum PrepaidActionTypes {
  PURCHASE = '[PURCHASE API] PURCHASE a service ahead of time',
  PURCHASE_SUCCESS = '[PURCHASE] PURCHASE Successfully',
  PURCHASE_FAIL = '[PURCHASE] PURCHASE Failed',
  FORWARD = '[FORWARD ] FORWARD the stepper form',
  BACKWARDS = '[BACKWARDS ] BACKWARD the stepper form',
  START = '[START ] Start the stepper form',
  FINAL = '[FINAL ] End the stepper stone',

}


export class Purchase implements Action {
  readonly type = PrepaidActionTypes.PURCHASE;

  constructor(public payload: Prepaid[]) { }
}
export class PurchaseSuccess implements Action {
  readonly type = PrepaidActionTypes.PURCHASE_SUCCESS;

  constructor(public payload: Prepaid[]) { }
}
export class PurchaseFailed implements Action {
  readonly type = PrepaidActionTypes.PURCHASE_FAIL;

  constructor(public error: string) { }
}
export class Forward implements Action {
  readonly type = PrepaidActionTypes.FORWARD;

}
export class Backward implements Action {
  readonly type = PrepaidActionTypes.BACKWARDS;

}
export class Start implements Action {
  readonly type = PrepaidActionTypes.START;

}
export class Final implements Action {
  readonly type = PrepaidActionTypes.FINAL;

}

export type PrepaidActions =
  | Purchase
  | PurchaseSuccess
  | PurchaseFailed
  | Backward
  | Forward
  | Start
  | Final;
