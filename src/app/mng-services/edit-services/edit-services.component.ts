import { Component, OnInit, Input, Inject } from '@angular/core';
import {IpayService} from '../../ipay/payme/ipay.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscriber,  Observable } from 'rxjs';
import {Service} from '../service.model';

import { Store } from '@ngrx/store';
import * as serviceActions from '../../mng-services/actions/service.actions';
import * as fromService from '../../mng-services/reducers/service.reducer';

import { SnackBarService } from '../../snackBar/snackBar';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})


export class EditServicesComponent implements OnInit {
  public service: IpayService;
  @Input() serviceid: string;
  positioncancel = 'below';
  public serviceObj: Service;
  public selectedValue: string;
  public serviceSub$: Subscriber<Observable<Service>>;
  public EditserviceForm: FormGroup = this.fb.group ({
    id: [],
    service_id: [],
    name: [Validators.required],
    category: [ Validators.required],
    price: [ Validators.required],
    sku: [],
    link: [],
    currency: [],
    quantity: [],
    created_at: [],
    updated_at: [''],
    deleted_at: [],
    description: [Validators.required]
});
  position = 'below';
  public action = 'Save';
  public currencies = ['$', '£', '€'];
  public categories = ['Service', 'Product'];
  public status = false;
  ngOnInit() {

}
/*OnDestroy() {
  this.serviceSub$.unsubscribe();
}*/
constructor(private serviceService: IpayService,
            private  fb: FormBuilder,
            private snackBar: SnackBarService,
            private store: Store<fromService.AppState>,
            @Inject(MAT_DIALOG_DATA) public data: Service,
            public dialogRef: MatDialogRef<EditServicesComponent>
            ) {
            this.serviceObj = Object.assign({}, data);
            this.EditserviceForm.setValue(this.serviceObj);
            this.newServicenum();
}

editService() {
  this.store.dispatch(new serviceActions.LoadService(this.EditserviceForm.value.id));
  this.store.dispatch(new serviceActions.UpdateService(this.EditserviceForm.value));
  this.snackBar.openSnackBar(`Service created `,  'successful' );
  this.close();
/*
  this.serviceSub$ =    this.serviceService.updateService(this.EditserviceForm.value).subscribe(serv => {
      this.status = false;
      if ( serv ) {
        this.serviceObj = serv[0];
        this.snackBar.openSnackBar(`Service created `,  'successful' );
        this.close();
      } else { this.snackBar.openSnackBar(`Service created`,  'failed' ); }

  });*/
}
close(): void {
this.dialogRef.close();
}
reset(): void {
  this.EditserviceForm.reset();

}
   // Fetch the next sequential number...
newServicenum() {
this.serviceService.getNextServiceID('services').subscribe(serv => {
console.log(serv);
});
}
}
