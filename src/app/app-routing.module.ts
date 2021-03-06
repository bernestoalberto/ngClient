import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MediaComponent } from './media/component/media.component';
import { MngServicesComponent } from './mng-services/mng-services.component';
import { AuthGuard } from './user/auth.guard';
import {LoginPageComponent} from './user/login-page/login-page.component';
import {ReportsComponent} from './reports/reports.component';
import { EventComponent } from './calendar/event.component';
import { MapComponent } from './map/map.component';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user/profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    data: {
      breadcrumb: 'Login'
    },
    component: LoginPageComponent
    // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'kanban',
    data: {
      breadcrumb: 'Kanban'
    },
    loadChildren: () =>
      import('./kanban/kanban.module').then(m => m.KanbanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    data: {
      breadcrumb: 'Customers'
    },
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'services',
    data: {
      breadcrumb: 'Services'
    },
    component: MngServicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    data: {
      breadcrumb: 'Reports'
    },
    component: ReportsComponent,
    //  loadChildren: () =>
    //  import('./mng-services/mng-services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'media',
    data: {
    breadcrumb: 'Media'
    },
    component: MediaComponent,
  //   loadChildren: () =>
  //   import('./media/media.module').then(m => m.MediaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    data: {
    breadcrumb: 'Calendar'
    },
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    data: {
    breadcrumb: 'Map'
    },
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    data: {
    breadcrumb: 'Dashboard'
    },
    component: DashBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    data: {
    breadcrumb: 'Profile'
    },
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
})
],
  exports: [RouterModule]
})
export class AppRoutingModule {}
