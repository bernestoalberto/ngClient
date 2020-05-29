import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
// import { HttpClient } from '@angular/common/http';
// import { cold } from 'jasmine-marbles';
import { AuthEffects } from './auth.effects';
import { provideMagicalMock, Mock } from 'angular-testing-library';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, of } from 'rxjs';
import {  LoginSuccess,  } from '../actions/auth.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('Auth Effects', () => {
  let effects: AuthEffects;
  // let authService: Mock<AuthService>;
  let actions$: Observable<any>;
  // let router: Mock<Router>;
  // let dialogService: Mock<MatDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMagicalMock(AuthService),
        provideMagicalMock(Router),
        provideMagicalMock(MatDialog),
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.inject(AuthEffects);
    // authService = TestBed.inject(AuthService);
    // dialogService = TestBed.inject(MatDialog);
    // router = TestBed.inject(Router);
  });

  it('should redirect the user after successful login', () => {
    const user: any = { username:  'Auth User' };
    const action = new LoginSuccess({ user });

    actions$ = of(action);
    effects.loginRedirect$.subscribe();

    // expect(router.navigate).toHaveBeenCalledWith(['/books']);
  });
});
