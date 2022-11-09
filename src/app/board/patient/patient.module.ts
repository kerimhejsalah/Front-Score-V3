import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { PatientRoutingModule } from './patient-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataPatientService } from './services/data-patient.service';
import { InterceptorService } from 'src/app/interceptor.service';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [AddPatientComponent, DetailPatientComponent, ListPatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    NgxPaginationModule
  ],
  providers: [DataPatientService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PatientModule { }
