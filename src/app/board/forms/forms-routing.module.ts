import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AffectationComponent } from './affectation/affectation.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ListFormsComponent } from './list-forms/list-forms.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [

  {path : '' , component: ListFormsComponent},
  {path : 'new' , component: AddFormComponent},
  {path: 'detail/:id' , component: DetailFormComponent},
  {path: 'preview/:id' , component: PreviewComponent},
  {path: 'affect/:id' , component: AffectationComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
