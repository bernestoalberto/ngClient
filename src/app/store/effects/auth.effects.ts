import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, exhaustMap, switchMap, filter, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginRedirect,
  GetToken,
  TokenRefreshed,
  TokenFailure,
  LoginFailure,
  Logout,
  LogoutConfirmed,
  LogoutComplete,
  LogoutCancelled,
  LoginErrorRedirect,
  SignUp,
  SignUpSuccess,
  SignUpFailure
} from '../actions/auth.actions';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../auth/components/logout-dialog.component';
import { Credentials, UserModel } from '../../user/user.model';
import { SnackBarService } from './../../snackBar/snackBar';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
// import { SignUpEmailFire } from './../actions/auth.actions';



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromAuth.AuthState>,
    private snackBar: SnackBarService,
    private dialogService: MatDialog
  ) { }
  @Effect()
  login$ =
    this.actions$.pipe(
      ofType<Login>(AuthActionTypes.Login),
      map((action: Login) => action.payload),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          catchError((err) => {
            console.error('Error on Login request', err);
            this.store.dispatch(new LoginFailure({ message: err }));
            return of([]);
          }),
        )
      ),
      map((user: any) => {
        if ( user ) {
        localStorage.setItem('spinner', 'false');
        localStorage.setItem('gravatar', user.profile_path);
        localStorage.setItem('username', user.first_name );
        localStorage.setItem('userState', 'Logout');
        localStorage.setItem('token', user.token);
        this.snackBar.openSnackBar('Welcome to Managment', user.first_name);
        return new LoginSuccess({ user  });
        } else {
         return of(new  LoginFailure({ message: 'Data empty' }));
        }
      })
      // map(user => new LoginSuccess({ user })),
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .pipe(
     ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
     tap(() => this.router.navigate(['/media']))
     );
  @Effect()
  LoginFailure$ = this.actions$
    .pipe(
      ofType<LoginFailure>(AuthActionTypes.LoginFailure, AuthActionTypes.SignUpFailure),
      map((error) => {
        this.snackBar.openSnackBar('Username or  Password incorrect', error.payload.message);
        localStorage.setItem('spinner', 'false');
        return of('error.payload.message');
      })
    );

  @Effect({ dispatch: false })
  loginErrorRedirect$ = this.actions$.pipe(
    ofType<LoginErrorRedirect>(AuthActionTypes.LoginFailure),
    map( _ => {
      this.router.navigate(['/login']);
    })
  );
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .pipe(
      ofType<LoginRedirect>(AuthActionTypes.LoginRedirect),
      catchError(() => of(new LoginFailure({ message: 'Redirect failed' }))),
      tap(() => this.router.navigate(['/home']))
    );
  @Effect()
  getToken$ = this.actions$
    .pipe(
      ofType<GetToken>(AuthActionTypes.GetToken),
      map((action: GetToken) => action),
      switchMap(_ =>
        this.authService
          .getToken()
          .pipe(
            catchError((err) => {
              console.error('Error Token request', err);
              this.store.dispatch(new TokenFailure(err));
              return of([]);
            }),
            filter(token => token.token),
            map((token: JWToken) => {
              localStorage.setItem('token', token.token);
              const newToken = new TokenRefreshed( token.token );
              return newToken;
            }),

          ),
      ),
    );
  @Effect()
  signUp: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SignUp),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        catchError((error) => {
          console.log(error);
          return of(new SignUpFailure({ error }));
        }),
        map((user) => {
          console.log(user);
          return new SignUpSuccess({ user });
        }),

      );
    }));

    @Effect()
    SignUpEmailFire: Observable<any> = this.actions$.pipe(
      ofType(AuthActionTypes.SignUpEmailFire),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.registerUserFire(payload).pipe(
          catchError((error) => {
            console.log(error);
            return of(new SignUpFailure({ error }));
          }),
          map((user) => {
            console.log(user);
            return new SignUpSuccess({ user });
          }),

        );
      }));

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpSuccess),
    map((user: UserModel) => {
      localStorage.setItem('token', user.token);
      this.router.navigateByUrl('/');
      return user.payload;
    })
  );



  @Effect()
  logoutConfirmation$ = this.actions$
    .pipe(
      ofType<Logout>(AuthActionTypes.Logout),
      exhaustMap(() =>
        this.dialogService
          .open(LogoutDialogComponent)
          .afterClosed()
          .pipe(
            map((confirmed: Logout) => {
              if (!confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            })
          ),
      ),
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .pipe(
      ofType<LogoutConfirmed>(AuthActionTypes.LogoutConfirmed),
      exhaustMap(_ =>
        this.authService
          .logout(localStorage.getItem('token'))
          .pipe(
            catchError((err) => {
              console.error('Error Logout action', err);
              this.store.dispatch(new LogoutCancelled());
              return of([]);
            }),
            map(() => new LogoutComplete()),
            tap(() => this.router.navigate(['/login'])),
          ),
      ),
    );
  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpFailure)
  );

}
export interface JWToken {
  alg?: Type;
  typ?: Algoritmo;
  token: string;
}

export enum Type {
  'JWT'
}
export enum Algoritmo {
  'JWT'
}



