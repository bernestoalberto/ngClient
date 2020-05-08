import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoadData } from './actions/reports.actions';
import * as fromReport from './reducers/reports.reducers';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  title = 'Admin Moft Stats';
   data$: Observable<any>;
   showSpinner$: Observable<boolean> = of(false);

   color = 'warn';
   mode = 'buffer';
   value = 50;
   bufferValue = 75;

  constructor(private store: Store<fromReport.AppState>) {
    this.showSpinner$ = this.getSpinerState();
  }

  ngOnInit() {
    this.triggerData();
    this.data$ = this.getData();
  }
  triggerData() {
    this.store.dispatch(new LoadData());
  }
  getData(): Observable<any> {
    return this.store.pipe(select(fromReport.getReport));
  }
  getSpinerState(): Observable<boolean> {
    return this.store.pipe(select(fromReport.isLoading));
  }
}
