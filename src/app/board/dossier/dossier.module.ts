import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierRoutingModule } from './dossier-routing.module';
import { DossierComponent } from './dossier.component';
import { AddDossierComponent } from './add-dossier/add-dossier.component';
import { ListDossierComponent } from './list-dossier/list-dossier.component';
import { DetailDossierComponent } from './detail-dossier/detail-dossier.component';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DossierService } from './services/dossier.service';
import { InterceptorService } from 'src/app/interceptor.service';
import { FormDossierComponent } from './form-dossier/form-dossier.component';
import { FormDossierAffectComponent } from './form-dossier-affect/form-dossier-affect.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MyDialogComponent } from 'src/app/companent/my-dialog/my-dialog.component';
import { DialogBodyComponent } from 'src/app/companent/dialog-body/dialog-body.component';
import { AdddossieretudComponent } from './adddossieretud/adddossieretud.component';
import { DetaildossieretudComponent } from './detaildossieretud/detaildossieretud.component';
import { ListdossieretudComponent } from './listdossieretud/listdossieretud.component';
import { AffectdossieretudComponent } from './affectdossieretud/affectdossieretud.component';
import { FormdossieretudComponent } from './formdossieretud/formdossieretud.component';
@NgModule({
  declarations: [DossierComponent, AddDossierComponent, ListDossierComponent, DetailDossierComponent, FormDossierComponent, FormDossierAffectComponent, AdddossieretudComponent, DetaildossieretudComponent, ListdossieretudComponent, AffectdossieretudComponent, FormdossieretudComponent],
  imports: [
    CommonModule,
    DossierRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    HttpClientModule,
    NgbAlertModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatDialogModule
   
  ],
  providers: [DossierService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  entryComponents: [DialogBodyComponent,
    MyDialogComponent]
})
export class DossierModule { }
