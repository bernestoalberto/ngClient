import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MngServicesComponent } from './mng-services.component';

const routes: Routes = [
  { path: '', component: MngServicesComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }

