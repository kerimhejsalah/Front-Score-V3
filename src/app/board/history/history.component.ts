import { Component, OnInit,AfterViewInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { DoctorDataService } from '../doctor/services/doctor-data.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  constructor( private _history :HistoryService,private _doctor: DoctorDataService) { }
  screenWidth: any; 
  dataAchat: any;
  dataDoctor: any;
  dataHistory=[];
  dataHistoryMonth=[];
  dataHistoryYear=[];
  ngOnInit(): void {
   
  }
  ngAfterViewInit(){
    this.screenWidth = window.innerWidth;
    this._history.getAllAchat().subscribe((res)=>{
      this.dataAchat=res
     /*  console.log("this.dataAchat",this.dataAchat.achat) */
    })
    this._doctor.getAllDoctor().subscribe(
      res => {
       this.dataDoctor=res
      
      this.dataDoctor.map((result)=>{
       
        this.dataAchat.achat.map((resulttow)=>{
          if(resulttow.user==result._id&&resulttow.type){
            result.datefin=resulttow.datedefin
            result.datedebut=resulttow.datedebut
            this.dataHistoryMonth.push(result)
          }
          if(resulttow.user==result._id&&!resulttow.type){
            result.datefin=resulttow.datedefin
            result.datedebut=resulttow.datedebut
            this.dataHistoryYear.push(result)
          }
        })
      })
        
      },
      err => { }
    );
    setTimeout(() => {
    /*   console.log("this.result",this.dataHistoryYear,this.dataHistoryMonth);   */
    }, 2000);
  
  }
  
    


}
