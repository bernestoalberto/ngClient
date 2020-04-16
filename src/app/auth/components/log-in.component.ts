import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscriber, Observable, Subject, of } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Login, Logout, GetToken, AuthActionTypes, LoginFireBase } from '../../store/actions/auth.actions';
import * as fromStoreLoginPage from '../../store/reducers/login-page.reducer';
import * as fromStoreAuth from '../../store/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/state';
import { Actions, ofType } from '@ngrx/effects';
// import { UserFire } from '../models/user.model';
// import { State } from '../../store/state';
import { UserModel } from './../models/user.model';
import { selectAuthState } from '../../../app/store/reducers/auth.reducer';
import { EmailValidation, PasswordValidation } from './validator';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {GoogleLogin, GetUser} from '../../auth/actions/user.actions';
import { SubSink } from 'subsink';
// const perf = firebase.performance();
// import { MessagingService } from '../../shared/messaging.service';
Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
});
export class LoginComponent implements OnInit, OnDestroy {
  public user: UserModel;
  userFire$: Observable<any>;

  public getState: Observable<any>;
  public errorMessage: string | null;
  public loginUserData = {};
  public isLoggedIn: Observable<boolean>;
  public error$ = this.store.select(fromStoreLoginPage.selectLoginPageError);
  public pending$ = this.store.select(fromStoreLoginPage.selectLoginPagePending);
  public session$: Subscriber<Observable<any>>;

  public subcriptions = new SubSink();

  public token$: Observable<string>;
  public complete$: Observable<any>;
  public isLoading$: Observable<boolean>;
  public errorMessage$: Observable<any>;
  public hasError$: Observable<any>;
  private unsubscribe: Subject<void> = new Subject();
  public LoginForm: FormGroup;

  public showSpinner$: Observable<boolean>;

  color = 'warn';
  mode = 'buffer';
  value = 50;
  bufferValue = 75;
  service: any;

  ui: firebaseui.auth.AuthUI;

  screenTrace: firebase.performance.Trace;

  constructor(
    private store: Store<fromStore.State>,
    private actions$: Actions,
    private fb: FormBuilder,
    //  private messaging: MessagingService
  ) {
    this.complete$ = this.actions$.pipe(ofType(AuthActionTypes.LoginSuccess));
    this.isLoading$ = this.store.select(fromStoreAuth.isLoading);
    this.errorMessage$ = this.store.select(fromStoreAuth.errorMessage);
    this.hasError$ = this.store.select(fromStoreAuth.hasError);
    this.showSpinner$  = of(false);
    this.isLoggedIn = this.store.select(fromStoreAuth.getLoggedIn);
  }


  ngOnInit() {
    this.token$ = this.getStoredToken();
    this.getToken();
    // this.screenTrace = perf.trace('loginScreen');
    // this.screenTrace.start();
    if (!localStorage.getItem('spinner')) {
      localStorage.setItem('spinner', 'false');
    }
    this.getState = this.store.select(selectAuthState);
    this.subcriptions.sink = this.getState.subscribe((state) => {
      if (state) {
        this.errorMessage = state.errorMessage;
      }

    });
    this.LoginForm = this.fb.group({
      username: new FormControl('', EmailValidation),
      password: new FormControl('', PasswordValidation),
    });
    this.subcriptions.sink = this.store.select(fromStoreAuth.isLoading).subscribe((state) => {
    this.showSpinner$ = this.isLoading$;
    this.showSpinnerCounter();
    });
    this.userFire$ = this.store.pipe(select(fromStoreAuth.selectUser));
    this.store.dispatch(new GetUser());
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
    this.unsubscribe.next();
    this.unsubscribe.complete();
    // this.screenTrace.stop();
  }
  cancelSubcriptions() {
    this.showSpinner$ = of(false);
  }
  showSpinnerCounter() {
   setTimeout(() => {
    this.cancelSubcriptions();
   }, 40000);
  }
  reset() {
    this.LoginForm.reset();
  }
  googleSignin() {
    // this.screenTrace = perf.trace('loginScreen');
    this.store.dispatch(new GoogleLogin());
  }

  private getToken(): void {
    this.subcriptions.sink = this.token$.subscribe((tk) => {
      if (!tk || !localStorage.getItem('token')) {
        this.store.dispatch(new GetToken());
      }
    });
  }
  getStoredToken(): Observable<string> {
    return this.store.pipe(select(fromStoreAuth.getToken));
  }
  get getUsername() {
    return this.LoginForm.get('username');
  }
  get getPassword() {
    return this.LoginForm.get('password');
  }
  public logout() {
    //  perf.trace('Logout');
    this.store.dispatch(new Logout());
  }
  public loginUser() {
    // const trace = perf.trace('loginScreen');
    //   trace.start();

    const user = {
      username: this.LoginForm.value.username,
      password: this.LoginForm.value.password,
      token: localStorage.getItem('token') || this.getStoredToken()
    };

    this.store.dispatch(new Login(user));
    //  trace.stop();
  }

  public loginEmailFire() {
    const user = {
      email: this.LoginForm.value.username,
      password: this.LoginForm.value.password,
      returnSecureToken: true
    };

    this.store.dispatch(new LoginFireBase(user));
  }


}


