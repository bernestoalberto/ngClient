import { createAction } from '@ngrx/store';

export const logout = createAction('[Auth] Logout');
export const login = createAction('[Auth] Login');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction('[Auth] Logout Confirmation Dismiss');
