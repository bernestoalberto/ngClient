import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromStore from '../../store/state';
import * as fromStoreAuth from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.State>,
    private router: Router
  ) {}

  canActivate() {
    return this.checkStoreAuthentication().pipe(
      mergeMap(storeAuth => {
        if (storeAuth) {
          return of(true);
        }

        return this.checkApiAuthentication();
      }),
      map(storeOrApiAuth => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }),
    );
  }

  checkStoreAuthentication() {
    return this.store.select(fromStoreAuth.selectIsLoggedIn).pipe(take(1));
  }

  checkApiAuthentication() {
    return this.authService.check().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }
}
