import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/state';
import * as fromStoreLoginPage from '../../store/reducers/login-page.reducer';
import { Login } from '../../store/actions/auth.actions';
import { Authenticate } from '../models/authentication.model';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      [error]="error$ | async"
      [disabled]="pending$ | async"
      (submitted)="onLogin($event)">
    </app-login-form>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 128px 12px 12px 12px;
    }

    app-login-form {
      width: 100%;
      min-width: 250px;
      max-width: 300px;
    }
  `,
  ],
})
export class LoginPageComponent implements OnInit {
  error$ = this.store.select(fromStoreLoginPage.selectLoginPageError);
  pending$ = this.store.select(fromStoreLoginPage.selectLoginPagePending);

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new Login(credentials));
  }
}
