import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, Subscriber } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store, select } from '@ngrx/store';
import * as fromService from '../../mng-services/reducers/service.reducer';
import { Router } from '@angular/router';
import { FireUser } from 'src/app/user/user.model';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy{
  servicesCant$: Observable<number> = of(0);
  mediaCant$: Observable<number> = of(0);
  events$: Observable<number> = of(0);
  aState: any = false;
  public routePath = '/services';
  user : FireUser;
  userSub$ = new SubSink();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private store: Store<fromService.AppState>, private breakpointObserver: BreakpointObserver,
              public afAuth$: AngularFireAuth, private router: Router) {}
  ngOnInit() {
    this.servicesCant$ = this.loadCantServices();
  }
  ngOnDestroy(): void {
  this.userSub$.unsubscribe();

  }
  loadCantServices(): Observable<number> {
    return this.store.pipe(select(fromService.getCantServices)) || of(0) ;
  }
  travel(){
    this.router.navigateByUrl('/services');
  }
  getUser(){
    this.userSub$.sink =  this.afAuth$.authState.subscribe((user)=>{
     this.user = user;
   })
  }
}
