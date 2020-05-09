import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/log-in.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  imports: [
  RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
})
export class AuthRoutingModule {}
