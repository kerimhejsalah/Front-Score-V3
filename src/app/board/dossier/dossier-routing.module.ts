import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDossierComponent } from './add-dossier/add-dossier.component';
import { DetailDossierComponent } from './detail-dossier/detail-dossier.component';

import { DossierComponent } from './dossier.component';
import { FormDossierAffectComponent } from './form-dossier-affect/form-dossier-affect.component';
import { ListDossierComponent } from './list-dossier/list-dossier.component';

const routes: Routes = [
  { path: '', component: DossierComponent , children: [

    { path: '' , component : ListDossierComponent },
    { path: 'add' , component: AddDossierComponent  },
    { path: 'detail/:id' , component: DetailDossierComponent },
    { path: 'affect/:id' , component : FormDossierAffectComponent }

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierRoutingModule { }
