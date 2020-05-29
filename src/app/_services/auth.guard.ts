import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate, Router,
  NavigationStart,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  , NavigationEnd
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { filter,  distinctUntilChanged } from 'rxjs/operators';
import * as fromAuth from '../store/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private subs$ =  new SubSink();
  private navigationUrl = '/home';
  private navigationLogin = '/login';

  constructor(private store: Store<fromAuth.AuthState>, private router: Router,
              private auth: AuthService, private location: Location) {
    this.routeEvent();
  }

  canActivate(/*next: ActivatedRouteSnapshot, state: RouterStateSnapshot*/): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
         // if (!this.localStorageGuard()) {
            this.router.navigate([this.navigationLogin]);
            return false;
        } else {
          return true;
        }
      }),
      take(1)
    );

  }
  localStorageGuard(): boolean {
    const val = localStorage.getItem('gravatar');
    let state: boolean;
    if (val !== '') {
      state = true;
    } else {
      state = false;
    }
    return state;
  }
  fireBaseGuard() {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user));
  }
  routeEvent() {
   this.subs$.sink = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
      ).
      subscribe((e: NavigationStart) => {
        if (e.navigationTrigger === 'imperative') {
          this.navigationUrl = e.url;
        }
      });
  }
  ngOnDestroy() {
     this.subs$.unsubscribe();
  }
}
