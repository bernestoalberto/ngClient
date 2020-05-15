import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable, of } from 'rxjs';
import { Logout } from '../../auth/actions/user.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/state';
@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user$: Observable<any> = of({});

  constructor(public auth: AuthService, private store: Store<fromStore.State> ) { }

  ngOnInit() {
    this.user$ = this.auth.user$;
  }
  logoutGoogle() {
    this.store.dispatch(new Logout());
  }
}
