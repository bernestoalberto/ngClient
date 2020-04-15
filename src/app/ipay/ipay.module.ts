import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CheckoutComponent} from './checkout.component';
const components = [CheckoutComponent];
@NgModule({
  declarations: [
    ...components
   ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    CheckoutComponent
  ],
})
export class IpayModule { }
