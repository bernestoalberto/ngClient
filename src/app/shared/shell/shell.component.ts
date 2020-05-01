import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store, select } from '@ngrx/store';
import * as fromService from '../../mng-services/reducers/service.reducer';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
  servicesCant$: Observable<number> = of(0);
  mediaCant$: Observable<number> = of(0);
  events$: Observable<number> = of(0);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private store: Store<fromService.AppState>, private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth) {}
  ngOnInit() {
    this.servicesCant$ = this.loadCantServices();
  }
  loadCantServices(): Observable<number> {
    return this.store.pipe(select(fromService.getCantServices)) || of(0) ;
  }
}
