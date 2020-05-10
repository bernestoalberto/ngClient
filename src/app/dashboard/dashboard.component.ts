import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user/user.model';
import { SnackBarService } from '../snackBar/snackBar';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { LoadServices } from '../mng-services/actions/service.actions';
import * as fromService from '../mng-services/reducers/service.reducer';
import { UserModel } from '../auth/models/user.model';
import { AppState } from '../store/state/app.state';
import { Service } from '../mng-services/service.model';
import * as fromAuth from '../store/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashBoardComponent implements OnInit {
  services: Service[];
  // public status = true;
  positiono = 'below';
  user: User = null;
  sessionId$: Observable<string>;
  token$: Observable<string>;
  public error$: Observable<string>;
  getState: Observable<any>;
  servicesData$: Observable<Service[]>;
  public user$: Observable<UserModel>;
  private subs = new SubSink();

  public showSpinner$: Observable<boolean>;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  status: boolean;

  @Output() imageSource = new EventEmitter<string>();
  constructor(
    private snackBar: SnackBarService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.store.select('service');
    this.showSpinner$ = this.isServiceLoaded();
  }

  ngOnInit() {
    this.sessionId$ = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token$ = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    this.store.pipe(select(fromAuth.selectUser),
      map((user) => {
        this.imageSource.emit(user.profile_path);
        return user;
      }));
    this.subs.sink = this.getCantServices().subscribe((value) => {
      if (value <= 1) {
        this.getServices();
      }
    });



    this.servicesData$ = this.loadServices();
    this.subs.sink = this.servicesData$.subscribe((data) => {
      if (data.length > 0) {
        this.services = data;
        //    this.status = false;
      }
    });
    this.requestTimeOut();
  }
  OnDestroy(): void {
    this.subs.unsubscribe();
  }
  public requestTimeOut() {
    setTimeout(() => {
      if (this.services) {
        if (this.services.length === 0) {
          // this.status = false;
          this.snackBar.openSnackBar('There is no data show. Please try again later', localStorage.getItem('username'));
        }
      } else {
        // this.status = false;
        this.snackBar.openSnackBar('There is no data show. Please try again later', localStorage.getItem('username'));
      }
    }, 5000);
  }
  checkIftherISErrors() {
    this.error$ = this.store.pipe(select(fromService.getError));
  }


  loadServices(): Observable<any> {
    return this.store.pipe(select(fromService.getServices));

  }
  getCantServices(): Observable<number> {
    return this.store.pipe(select(fromService.getCantServices));
  }
  getServices() {
    this.store.dispatch(new LoadServices());
  }
  isServiceLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromService.getServicesLoading));
  }

}

export interface Tile {
  cols: number;
  rows: number;
}
