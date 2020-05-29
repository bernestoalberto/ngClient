import { TestBed } from '@angular/core/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AuthGuard } from '../../_services/auth.guard';
import * as fromAuth from '../reducers';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let store: MockStore<fromAuth.State>;
  let loggedIn: MemoizedSelector<fromAuth.State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore()],
    });

    store = TestBed.inject(Store);
    guard = TestBed.inject(AuthGuard);

    loggedIn = store.overrideSelector(fromAuth.selectLoggedIn, false);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const expected = cold('(a|)', { a: true });

    loggedIn.setResult(true);

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
