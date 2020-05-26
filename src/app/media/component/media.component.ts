import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { DialogComponent } from './container/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Media } from './media.model';
import { CreateMedia, loadMedia } from '../actions/media.actions';
import * as fromMedia from '../reducers/media.reducer';
import { UserModel } from '../../auth/models/user.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAuth from '../../store/reducers/auth.reducer';
import { SnackBarService } from '../../snackBar/snackBar';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { ChildMessageRendererComponent } from '../../shared/action.renderer.component';
import { SubSink } from 'subsink';
import { UploadService } from './media.service';
// import * as firebase from 'firebase';
// import { UploaderService } from './../../_services/uploader.service';
// const perf = firebase.performance();
@Component({
  selector: 'app-upload',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit, OnDestroy {
  public columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true, width: 120 },
    { headerName: 'Name', field: 'name', sortable: true, filter: true, width: 150 },
    { headerName: 'Path', field: 'path', sortable: true, filter: true, width: 200 },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, width: 200 },
    { headerName: 'Service Id', field: 'service_id', sortable: true, filter: true, width: 150 },
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
  private subs =  new SubSink();
  rowData: any;
  public style = {
    marginTop: '20px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };
  public dataSource = [];
  public status = true;
  public hide;
  public user: UserModel = null;
  public check;
  showDialog = false;
  public dialogType;
  // private allItems: any[];
  pager: any = {};
  mediaContent: any[];
  public positiono = 'below';
  lastLogin: string;

  tableCt: number;
  sortedData;
  sessionId: Observable<string>;
  token: Observable<string>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  public services$: Observable<any>;
  public serv$: Observable<any>;

  public error$: Observable<string>;
  public dialogRef: MatDialogRef<any>;
  count$: Observable<number>;

  public mediaData$: Observable<Media[]>;
  public mediaSubNgrx$;

  // renderer: any;

  modules = AllCommunityModules;
  public showSpinner$: Observable<boolean>;
  color = 'warn';
  mode = 'buffer';
  value = 50;
  bufferValue = 75;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromAuth.AppState>,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private upServ: UploadService
  ) {
    this.store.select('media');
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


 // Create the Dialogs using dialogRef
  ngOnInit() {

    this.showSpinner$ = this.isMediaLoaded();
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    // const trace = perf.trace('itemsQuery');

    this.mediaData$ = this.LoadMedia();
    this.subs.sink = this.mediaData$.subscribe((meds) => {
    // trace.incrementMetric('collectionSize', meds.length);
    if (meds.length === 0) {
      this.getMedia();
    }
    });
    this.subs.sink = this.upServ.getMediaFireBaseDB().subscribe((/*list*/) => {
      // this.allItems =  list;
    });
    this.getErrors();
    this.requestTimeOut();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNode();
    const selectedData = selectedNodes.map(node => node.data) ;
    const selectedDataStringRepresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected Rows ${selectedDataStringRepresentation}`);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  public openUploadDialog() {
    this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }
  getMedia() {
    this.store.dispatch(loadMedia());
  }
  LoadMedia(): Observable<any> {
    // perf.trace('queryTrace');
    return this.store.pipe(select(fromMedia.fetchMedias));
  }
  CreateMedia(media): void {
    this.store.dispatch(new CreateMedia(media));
  }
  getErrors(): void {
    this.error$ = this.store.pipe(select(fromMedia.getError));
  }
  getNewMedia(): Observable<any> {
    return this.serv$ = this.store.pipe(select(fromMedia.getMedia));
  }
  isMediaLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromMedia.getMediaLoading));
  }

  requestTimeOut() {
    setTimeout(() => {
      if (this.dataSource.length === 0) {
        this.showSpinner$ = of(false);
        this.snackBar.openSnackBar('There is no data show. Please try again later', localStorage.getItem('username'));
      }
    }, 30000);
  }
}
