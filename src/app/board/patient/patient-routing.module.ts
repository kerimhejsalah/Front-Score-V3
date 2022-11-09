import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';


const routes: Routes = [

    {path: '' , component: ListPatientComponent},
    {path: 'add' , component: AddPatientComponent },
    {path: 'detail/:id' , component: DetailPatientComponent },
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
