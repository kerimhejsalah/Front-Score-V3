import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DoctorDataService } from '../doctor/services/doctor-data.service';
import { FormsDataService } from '../forms/services/forms-data.service';
import { DataPatientService } from '../patient/services/data-patient.service';
import { LayoutService } from '../services/layout.service';






@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmation !</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>tu es sure de faire cette action?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">non</button>
      <button type="button" class="btn btn-primary" (click)="restorer(); activeModal.close()">oui</button>
   
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() i;

  constructor(public activeModal: NgbActiveModal, private _doctor: DoctorDataService,
   
    private _forms: FormsDataService,
    private router : Router,
    ) {}




    restorer(){

      if(this.i===1 ){
        this.restorerDoctor(this.id);
      }else  if(this.i===2 ){
        this.restorerPatient(this.id);
      }else if(this.i===3 ){
        this.restoreForm(this.id);
      } else if(this.i===11 ){
        this.deleteDoctor(this.id);
      } else if(this.i===22 ){
        this.deletePatient(this.id);
      } else {
        this.deleteForm(this.id);
      } 



    }


  deleteForm(id: any){

    this._forms.deleteForms(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );

  }
  deletePatient(id: any){

    this._doctor.deletePatient(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );

  }
 
  deleteDoctor(id: any){

    this._doctor.deleteDoctor(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );

  }


    
  restoreForm(id:any){

    this._forms.restorerForm(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );
  }



  restorerDoctor(id:any){

    this._doctor.restorerDoctor(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );
  }


  restorerPatient(id:any){

    this._doctor.restorerPatient(id).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/archive']));
      },
      err=>{
        
      }
    );
  }





}











@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements AfterViewInit, OnInit {

  constructor(private _doctor: DoctorDataService , 
    private _patient: DataPatientService,
    public path: EndpointService,
    private _forms: FormsDataService,
    private modalService: NgbModal,

    public layout: LayoutService ,
    ) { 
      this.getScreenSize();
    }
  
    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
         
          this.screenWidth = window.innerWidth;
  
    }

screenWidth: any; 
   
    patients: any;
    doctors: any;
    forms: any;
    p: number = 1;

    selectedtab = 1;
    page:number=1;
    totalLengthdoctor:any;
    totalLengthpatient:any;
    totalLengthformulaire:any;


    open(id: any, i:any) {
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.id = id ;
      modalRef.componentInstance.i = i ;

  
    
    }  







  ngOnInit(): void {

  
  }
selectColor(c){
  console.log
}
  ngAfterViewInit(){
    this._doctor.getDoctorFromArchive().subscribe(
      res=>{
        this.doctors = res;
        this.totalLengthdoctor=res.length;
        
      },
      err=>{
   
        
      }
    );


    this._patient.getPatientFromArchive().subscribe(
      res=>{
        this.patients =  res;
        this.totalLengthpatient=res.length;
      },
      err=>{
       
        
      }
    );


    this._forms.getFormFromArchive().subscribe(
      res=>{
        this.forms = res;
    /*     this.totalLength=res.length; */
      },
      err=>{
   
      }
    );


  }




}
