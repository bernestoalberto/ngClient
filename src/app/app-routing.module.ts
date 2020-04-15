import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MngServicesComponent } from './mng-services/mng-services.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then(m => m.KanbanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'services',
    component: MngServicesComponent,
    // loadChildren: () =>
    // import('./mng-services/mng-services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'media',
  //   loadChildren: () =>
  //   import('./media/media.module').then(m => m.MediaModule),
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
