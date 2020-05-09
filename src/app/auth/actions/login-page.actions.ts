import { createAction, props } from '@ngrx/store';
import { Authenticate } from '../models/authentication.model';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Authenticate }>()
);
