import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { BoardComponent } from './board.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { VideoComponent } from './video/video.component';
import { HistoryComponent } from './history/history.component';
const routes: Routes = [
  {path:'' , component: BoardComponent , children:[ 
    {path: '' , component: StatisticsComponent},

    {path: 'forms' , loadChildren: ()=> import('./forms/forms.module')
    .then(m=>m.FormModule) },
   
    {path: 'doctors' , loadChildren: ()=> import('./doctor/doctor.module')
    .then(m=>m.DoctorModule) },

    {path: 'patients' , loadChildren: ()=> import('./patient/patient.module')
        .then(m=>m.PatientModule)},
    { path: 'dossier', loadChildren: () => import('./dossier/dossier.module')
        .then(m => m.DossierModule) },

    
  {path:'video' , component: VideoComponent},
  {path:'archive' , component: ArchiveComponent},
  {path: 'profile' , component: ProfileComponent},
  {path:'history' , component: HistoryComponent},




  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
