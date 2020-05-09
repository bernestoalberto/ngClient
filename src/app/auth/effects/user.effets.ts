import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserFire } from '../models/user.model';
import { AuthService } from '../../_services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AuthActions
} from '../../store/actions';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, delay, catchError, tap } from 'rxjs/operators';


import * as userActions from '../actions/user.actions';
export type Action = userActions.UserActions;


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authServie: AuthService, private afAuth: AngularFireAuth,
              private router: Router) { }

  @Effect()
  login: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GOOGLE_LOGIN),
    map((action: userActions.GoogleLogin) => action.payload),
    switchMap(payload => {
      return from(this.authServie.googleSignin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }),
    catchError(err => {
      return of(new userActions.AuthError({ error: err.message }));
    }));
  @Effect()
  loginRedirect$ = this.actions$
    .pipe(
      ofType<AuthActions.LoginRedirect>(AuthActions.AuthActionTypes.LoginRedirect),
      catchError(() => of(new AuthActions.LoginFailure({ message: 'Redirect failed' }))),
      tap(() => this.router.navigate(['/home']))
    );

  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    delay(2000), // delay to show loading spinner, delete me!
    map(authData => {
      if (authData) {
        /// User logged in
        const user = new UserFire(authData.uid, authData.displayName);
        return new userActions.Authenticated(user);
      } else {
        /// User not logged in
        return new userActions.NotAuthenticated();
      }

    }),
    tap(() => this.router.navigate(['/home'])),
    catchError(err => of(new userActions.AuthError())));

  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LOGOUT),
    map((action: userActions.Logout) => action.payload),
    switchMap(payload => {
      return of(this.afAuth.auth.signOut());
    }),
    map(authData => {
      return new userActions.NotAuthenticated();
    }),
    catchError(err => of(new userActions.AuthError({ error: err.message }))));

}




