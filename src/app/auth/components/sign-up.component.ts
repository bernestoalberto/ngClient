import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { SignUp, SignUpEmailFire } from '../../../app/store/actions/auth.actions';
import { UserModel } from './../models/user.model';
import { Observable, of, Subscription } from 'rxjs';
import { selectAuthState } from '../../../app/store/reducers/auth.reducer';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmailValidation, PasswordValidation, RepeatPasswordEStateMatcher, RepeatPasswordValidator } from './validator';
import * as fromStoreAuth from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  formSub$: Subscription;
  user: UserModel;
  getState$: Observable<any>;
  errorMessage: string | null;
  passwordsMatcher = new RepeatPasswordEStateMatcher();

  public showSpinner$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  invalid$: Observable<boolean> = of(false);
  public signUpForm: FormGroup;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  url = 'https://img.icons8.com/color/48/000000/firebase.png';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.getState$ = this.store.select(selectAuthState);
    this.isLoading$ = this.store.select(fromStoreAuth.isLoading);

    this.signUpForm = this.fb.group({
      username: new FormControl('', EmailValidation),
      password: new FormControl('', PasswordValidation),
      password_check: new FormControl('', PasswordValidation)

    }, { validator: RepeatPasswordValidator });
    this.showSpinner$ = of(false);
  }

  ngOnInit() {
    this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    // this.formSub$ = this.signUpForm.valueChanges.subscribe(value => console.log(value));
  }
  ngOnDestroy() {
    //  this.formSub$.unsubscribe();
  }
  get getUsername() {
    return this.signUpForm.get('username');
  }
  get getPassword() {
    return this.signUpForm.get('password');
  }
  public signUpEmailFire() {
    const user = {
      email: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      returnSecureToken: true
    };
    this.store.dispatch(new SignUpEmailFire(user));
  }

  signUpUser(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password,
      token: localStorage.getItem('token')
    };
    this.store.dispatch(new SignUp(payload));
  }

  reset() {
    this.signUpForm.reset();
  }

}
