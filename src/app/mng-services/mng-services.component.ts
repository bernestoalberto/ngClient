import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './../user/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewServicesComponent } from './new-services/new-services.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
// import { Router } from '@angular/router';
// import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {ThemePalette} from '@angular/material/core';
import { Store, select } from '@ngrx/store';

import * as serviceActions from '../mng-services/actions/service.actions';
import * as fromService from '../mng-services/reducers/service.reducer';

import { Service } from './service.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SnackBarService } from '../snackBar/snackBar';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { ChildMessageRendererComponent } from '../shared/action.renderer.component';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-mng-services',
  templateUrl: './mng-services.component.html',
  styleUrls: ['./mng-services.component.scss'],
})

export class MngServicesComponent implements OnInit {
  public columnDefs = [
    { headerName: 'Number', field: 'id', sortable: true, filter: true, width: 150 },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, width: 200, },
    { headerName: 'Descritpion', field: 'description', filter: true, width: 200, },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, width: 150, },
    { headerName: 'Link', field: 'link', sortable: true, width: 200, },
    { headerName: 'Currency', field: 'currency', sortable: true, width: 150 },
    { headerName: 'Updated', field: 'updated_at', hide: true },
    {
      headerName: 'Actions',
      field: 'actions',
      resizable: true,
      width: 300,
      cellRenderer: 'childMessageRendererComponent'
    }
  ];
  public rowSelection;
  public rowBuffer;
  public defaultColDef;
  public gridApi;
  public gridColumnApi;
  public frameworkComponents;

  public dataSource = [];
  public status = true;
  public hide;
  public user: User = null;
  public check;
  showDialog = false;
  public dialogType;
  pager: any = {};
  pagedItems: any[];
  public positiono = 'below';
  lastLogin: string;
  tableCt: number;
  sortedData;
  sessionId: Observable<string>;
  token: Observable<string>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public services$: Observable<Service[]>;
  public serv$: Observable<any>;
  public serviceSub$;
  public serviceSubNgrx$;
  public error$: Observable<string>;
  public dialogRef: MatDialogRef<any>;
  count$: Observable<number>;
  public showSpinner$: Observable<boolean>;

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'buffer';
  value = 50;
  bufferValue = 75;
  private subs = new SubSink();

  defaultElevation = 3;
  raisedElevation = 9;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  modules = AllCommunityModules;

  style = {
    marginTop: '20px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };

  servicesData$: Observable<Service[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromService.AppState>,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    // public authService: AuthService,
  ) {
    this.store.select('services');

    this.showSpinner$ = this.isServiceLoaded();
    // cell renderer class
    this.defaultColDef = {
      resizable: true,
      width: 100
    };
    this.rowBuffer = 0;
    this.frameworkComponents = {
      childMessageRendererComponent: ChildMessageRendererComponent,
    };
  }

  ngOnInit() {

    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));


    this.subs.sink = this.getCantServices().subscribe((value) => {
      if (value <= 1) {
        this.loadServices();
      }
    });

    this.servicesData$ = this.getServices();
    this.subs.sink = this.servicesData$.subscribe(data => {
      if (data.length > 0) {
        this.dataSource = data;
        this.sortedData = this.dataSource;
        this.status = false;
      }
    });
    this.requestTimeOut();
    this.getErrors();
  }

  loadServices() {
    this.store.dispatch(new serviceActions.LoadServices());
  }

  createServices(services): void {
    this.store.dispatch(new serviceActions.CreateServices(services));
  }
  getErrors(): void {
    this.error$ = this.store.pipe(select(fromService.getError));
  }
  getNewServices(): Observable<any> {
    return this.serv$ = this.store.pipe(select(fromService.getServices));
  }

  OnDestroy() {
    this.subs.unsubscribe();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  openDialog(numDialog = 1, payload = {}): void {
    if (numDialog === 1) {
      this.dialogRef = this.dialog.open(NewServicesComponent, {
        width: '550px',
      });
    } else if (numDialog === 2) {
      this.dialogRef = this.dialog.open(EditServicesComponent, {
        width: '850px',
        height: '850px',
        data: payload

      });
    } else if (numDialog === 3) {
      this.dialogRef = this.dialog.open(DeleteServiceComponent, {
        width: '550px',
        height: '150px',
        data: payload
      });
    }

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
  requestTimeOut() {
    setTimeout(() => {
      if (this.dataSource.length === 0) {
        this.status = false;
        this.showSpinner$ = of(false);
        this.snackBar.openSnackBar('There is no data show. Please try again later', 'Gaby');
      }
    }, 4000);
  }
  getServices(itemsPerPage = 10): Observable<any> {
    this.tableCt = itemsPerPage;
    return this.store.pipe(select(fromService.getServices));
  }
  getCantServices(): Observable<number> {
    return this.store.pipe(select(fromService.getCantServices));
  }
  public updateOrdersTable(/*pagePerItem: number*/) {
    this.getServices();
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  fillLarge() {
    this.setWidthAndHeight('100%', '100%');
  }

  fillMedium() {
    this.setWidthAndHeight('60%', '60%');
  }

  fillExact() {
    this.setWidthAndHeight('400px', '400px');
  }

  setWidthAndHeight(width, height) {
    this.style = {
      marginTop: '20px',
      width,
      height,
      boxSizing: 'border-box'
    };
  }
  isServiceLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromService.getServicesLoading));
  }
}
