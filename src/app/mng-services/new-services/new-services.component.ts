import { Component, Input, OnInit } from '@angular/core';
import {IpayService} from '../../ipay/payme/ipay.service';
import {FormBuilder, Validators } from '@angular/forms';
import { Subscriber, Observable } from 'rxjs';
import {Service} from '../service.model';
import { SnackBarService } from '../../snackBar/snackBar';
// import {MyErrorStateMatcher} from '../../../app/errorStateMatcher/error-state-matcher';
import { Store } from '@ngrx/store';
import * as serviceActions from '../../mng-services/actions/service.actions';
import * as fromService from '../../mng-services/reducers/service.reducer';
@Component({
  // moduleId: module.id.toString(),
  selector: 'app-new-services',
  templateUrl: './new-services.component.html',
  styleUrls: ['./new-services.component.scss'],
  providers : [FormBuilder]
})
export class NewServicesComponent implements OnInit {
  public service: IpayService;
  @Input() serviceid: string;
  public serviceSub$: Subscriber<Observable<Service>>;
  positioncancel = 'below';
  public serviceObj: {};
  public selectedValue: string;

  public serviceForm ;
  position = 'below';
  public action = 'Save';
  public currencies = ['$', '£', '€'];
  public categories = ['Service', 'Product'];

  public status = false;
  ngOnInit() {
 this.buildForm();
 this.newServicenum();
}
/* OnDestroy() {
  this.serviceSub$.unsubscribe();
}*/
constructor(/*private serviceService: IpayService,*/
            private  fb: FormBuilder,
            private store: Store<fromService.AppState>,
            private snackBar: SnackBarService ) {

}

buildForm() {
 this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      category: ['',  Validators.required],
      price: ['',  Validators.required],
      sku: [''],
      description: ['', Validators.required]
  });
}

createService() {
      this.store.dispatch(new serviceActions.CreateService(this.serviceForm.value));
     // this.serviceService.createService(this.serviceForm.value).subscribe(serv => {
      this.status = false;
    //  if ( serv ) {
      this.reset();
      this.snackBar.openSnackBar(`Service created `,  'successful' );
      // } else {   this.snackBar.openSnackBar(`Service created`,  'failed' ); }
 // });
}
close() {
this.serviceForm.close();
}
reset() {
this.serviceForm.reset();
}
   // Fetch the next sequential number...
   newServicenum() {
     this.store.dispatch(new serviceActions.GetNextServiceID());
  }
}
