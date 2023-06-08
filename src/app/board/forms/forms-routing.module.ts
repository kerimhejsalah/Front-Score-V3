import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AffectationComponent } from './affectation/affectation.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ListFormsComponent } from './list-forms/list-forms.component';
import { PreviewComponent } from './preview/preview.component';
import { ListeFormsEtudComponent } from './liste-forms-etud/liste-forms-etud.component';
import { NewFormsEtudsComponent } from './new-forms-etuds/new-forms-etuds.component';
import { DetailformsetudComponent } from './detailformsetud/detailformsetud.component';
import { FormpreviewetudComponent } from './formpreviewetud/formpreviewetud.component';
import { PreviewetudComponent } from './previewetud/previewetud.component';
import { AffectetudComponent } from './affectetud/affectetud.component';
const routes: Routes = [

  {path : '' , component: ListFormsComponent},
  {path : 'etud' , component: ListeFormsEtudComponent},
  {path : 'newetud' , component: NewFormsEtudsComponent},
  {path : 'detailformetud/:id' , component: DetailformsetudComponent},
  {path : 'previewetud' , component: FormpreviewetudComponent},
  {path : 'new' , component: AddFormComponent},
  {path: 'detail/:id' , component: DetailFormComponent},
  {path: 'preview/:id' , component: PreviewComponent},
  {path: 'previewetud/:id' , component: PreviewetudComponent},
  {path: 'affect/:id' , component: AffectationComponent },
  {path: 'affectetud/:id' , component: AffectetudComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
