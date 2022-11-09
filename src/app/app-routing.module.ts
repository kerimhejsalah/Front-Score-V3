import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { ForgotdoctorComponent } from './forgotdoctor/forgotdoctor.component';
import { ForgotpatientComponent } from './forgotpatient/forgotpatient.component';

import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';

import { GuardGuard } from './services/guard.guard';
import { TokenGuard } from './services/token.guard';


const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },

  {
    path: 'admin', canActivate: [GuardGuard, TokenGuard], loadChildren: () => import('./board/board.module')
      .then(m => m.BoardModule)
  },




  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotComponent },
  { path: 'resetpassword/:id/:token', component: ResetComponent },
  { path: 'resetpassworddoctor/:id/:token', component: ForgotdoctorComponent },
  { path: 'resetpasswordpatient/:id/:token', component: ForgotpatientComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
