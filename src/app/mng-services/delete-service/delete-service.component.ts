import { Component, OnInit, Inject } from '@angular/core';
import { SnackBarService } from '../../snackBar/snackBar';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Service} from '../service.model';
import { Subscriber, Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as serviceActions from '../../mng-services/actions/service.actions';
import * as fromService from '../../mng-services/reducers/service.reducer';
@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.css']
})
export class DeleteServiceComponent implements OnInit {
service: Service;
public serviceSub$: Subscriber<Observable<Service>>;
constructor(private snackBar: SnackBarService,
            private store: Store<fromService.AppState>,
            @Inject(MAT_DIALOG_DATA) public data: Service,
            public dialogRef: MatDialogRef<DeleteServiceComponent>
  ) {
             this.service = data;
}
  ngOnInit() {
  }
  deleteSerivice(): void {
     this.store.dispatch(new serviceActions.DeleteService((this.service.id)));
     this.snackBar.openSnackBar(`Service deleted `,  'successful' );
     this.close();
  }
  close(): void {
    this.dialogRef.close();
    }
}
