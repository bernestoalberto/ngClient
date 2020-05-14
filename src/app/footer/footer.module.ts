import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer-component/footer.component';

import { MatIconModule } from '@angular/material/icon';

// Ng Boostrap Module
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
  CommonModule,
  MatIconModule,
  MDBBootstrapModule
  ]
})
export class FooterModule { }
