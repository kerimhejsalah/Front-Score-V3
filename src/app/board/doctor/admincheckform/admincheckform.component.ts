import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorDataService } from '../services/doctor-data.service';

@Component({
  selector: 'app-admincheckform',
  templateUrl: './admincheckform.component.html',
  styleUrls: ['./admincheckform.component.css']
})
export class AdmincheckformComponent implements OnInit {

  constructor(private _doctor: DoctorDataService, private route: ActivatedRoute) { }
   
  id: any;
  affectations:any;
  doctor: any;
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');


    this._doctor.getDoctorById(this.id).subscribe(
      res=>{
        this.doctor = res;
      }
    )

    this._doctor.getAllDoctorAffectationForm(this.id).subscribe(
      res=>{
        this.affectations = res;
     /*    console.log(this.affectations,this.route.snapshot.paramMap.get('id')); */
        
      },
      err=>{
        
      }
    );


  }

}
