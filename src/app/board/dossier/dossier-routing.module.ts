import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDossierComponent } from './add-dossier/add-dossier.component';
import { DetailDossierComponent } from './detail-dossier/detail-dossier.component';

import { DossierComponent } from './dossier.component';
import { FormDossierAffectComponent } from './form-dossier-affect/form-dossier-affect.component';
import { ListDossierComponent } from './list-dossier/list-dossier.component';
import { AdddossieretudComponent } from './adddossieretud/adddossieretud.component';
import { DetaildossieretudComponent } from './detaildossieretud/detaildossieretud.component';
import { ListdossieretudComponent } from './listdossieretud/listdossieretud.component';
import { AffectdossieretudComponent } from './affectdossieretud/affectdossieretud.component';
const routes: Routes = [
  { path: '', component: DossierComponent , children: [

    { path: '' , component : ListDossierComponent },
    { path: 'add' , component: AddDossierComponent  },
    { path: 'detail/:id' , component: DetailDossierComponent },
    { path: 'affect/:id' , component : FormDossierAffectComponent },
    { path: 'addetud' , component: AdddossieretudComponent  },
    { path: 'detailetud/:id' , component: DetaildossieretudComponent },
    { path: 'listetud' , component : ListdossieretudComponent },
    { path: 'affectetud/:id' , component : AffectdossieretudComponent }

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierRoutingModule { }
