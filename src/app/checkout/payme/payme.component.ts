import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs';
import {Service} from '../../mng-services/service.model';
import {IpayService} from './ipay.service';


declare var paypal;

@Component({
  selector: 'app-payme',
  templateUrl: './payme.component.html',
  styleUrls: ['./payme.component.css']
})
export class PaymeComponent implements OnInit, OnDestroy {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  public service: Service;
  private subcriber;

  paidFor = false;

  ngOnInit() {


    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.service.description,
                amount: {
                  currency_code: this.service.currency,
                  value: this.service.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);

  }
  constructor(private ipayServicePay: IpayService) {

  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    // this.subcriber.unsubscribe();
  }


}



