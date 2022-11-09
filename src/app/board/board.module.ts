import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ArchiveComponent } from './archive/archive.component';
import { MatButtonModule } from '@angular/material/button';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HistoryComponent } from './history/history.component';
@NgModule({
  declarations: [BoardComponent, HeaderComponent, SidebarComponent, FooterComponent, ArchiveComponent, StatisticsComponent, ProfileComponent, HistoryComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatButtonModule,
    ChartsModule,
    FormsModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatButtonToggleModule,
    YouTubePlayerModule

  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  
  bootstrap: [BoardComponent]
})
export class BoardModule { }
