import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegSuccessComponent } from './components/reg-success/reg-success.component';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'

  },
  {
    path: 'dashboard',
    component:DashboardComponent,
    pathMatch:'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'reg-success',
    component: RegSuccessComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
