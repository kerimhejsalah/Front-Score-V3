import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './add-form/add-form.component';
import { FormsRoutingModule } from './forms-routing.module';
import { ListFormsComponent } from './list-forms/list-forms.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsDataService} from './services/forms-data.service';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';
import { DetailFormComponent, NgbdModalCheckLock, NgbdModalLock } from './detail-form/detail-form.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AffectationComponent } from './affectation/affectation.component';
import { InterceptorService } from 'src/app/interceptor.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import {MatSliderModule} from '@angular/material/slider';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { QuillModule } from 'ngx-quill'
import { Ng5SliderModule } from 'ng5-slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import {AutosizeModule} from 'ngx-autosize';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [AddFormComponent, ListFormsComponent, PreviewComponent, DetailFormComponent, AffectationComponent, NgbdModalLock, NgbdModalCheckLock],
  imports: [
    CommonModule,
    Ng5SliderModule,
    FormsRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxPaginationModule,
    AutosizeModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ChartsModule,
    HttpClientModule,
    NgbAlertModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    NgxSliderModule,
    QuillModule
  ],
  providers: [FormsDataService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class FormModule { }
