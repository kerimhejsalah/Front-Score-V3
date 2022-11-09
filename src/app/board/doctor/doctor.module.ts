import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';

import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DetailDoctorComponent } from './detail-doctor/detail-doctor.component';
import {MatButtonModule} from '@angular/material/button';
import { DoctorDataService } from './services/doctor-data.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AffectationsComponent } from './affectations/affectations.component';
import { MyformComponent } from './myform/myform.component';
import { InterceptorService } from 'src/app/interceptor.service';
import { AdmincheckformComponent } from './admincheckform/admincheckform.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ ListDoctorComponent, AddDoctorComponent, DetailDoctorComponent, AffectationsComponent, MyformComponent, AdmincheckformComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    NgxPaginationModule
 
  ],
  providers: [DoctorDataService , {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})
export class DoctorModule { }
