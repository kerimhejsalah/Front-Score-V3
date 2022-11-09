import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AdmincheckformComponent } from './admincheckform/admincheckform.component';
import { AffectationsComponent } from './affectations/affectations.component';
import { DetailDoctorComponent } from './detail-doctor/detail-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';

const routes: Routes = [

  {path:'', component: ListDoctorComponent},
  {path: 'add', component: AddDoctorComponent},
  {path: 'detail/:id' , component: DetailDoctorComponent},
  {path: 'affect/:id' , component: AffectationsComponent},
  {path: 'admincheckform/:id' , component: AdmincheckformComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
