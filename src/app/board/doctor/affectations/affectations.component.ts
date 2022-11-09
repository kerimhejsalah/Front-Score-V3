import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DoctorDataService } from '../services/doctor-data.service';





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
      <p>Tu es sure d'effectuer cette action  ?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">non</button>
      <button  type="button" class="btn btn-danger" (click)="action(); activeModal.close()">oui</button>


    </div>
  `
})
export class NgbdModalContent {
  @Input() idUser;
  @Input() idForm;

  @Input() i;




  constructor(public activeModal: NgbActiveModal,
    private _doctor: DoctorDataService,
    private toastr: ToastrService,
    private router : Router, 
    

    ) {}


    action(){
      if(this.i == 1){
          this.affect(this.idForm);
      }else{
        this.disaffect(this.idForm);
      }
    }


    affect(id: any){

      let affectation = {
      user: this.idUser,
      form: id
      }
      
      
      this._doctor.affect(affectation).subscribe(
      res=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/doctors/affect' , this.idUser]));

     
      },
      err=>{
    
      
      }
      );
      
      
      }

   
      disaffect(f: any){

        this._doctor.disaffect(this.idUser, f).subscribe(
          res=>{
            
            
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/admin/doctors/affect' , this.idUser]));
    
         
          },
          err=>{
            
            
          }
        );
      
      
      }

}















@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.css']
})
export class AffectationsComponent implements AfterViewInit, OnInit {

 
  constructor(private _docor : DoctorDataService,
    private router: ActivatedRoute,
    private modalService: NgbModal, 
  

) { }


allForms : any;


id: any;

doctor:any;
allFormsFil=[];
affectedToast = false;
affectedToastWithSuccess = false;
formAffectations : any;

selectedDoctor = 0;

 ngOnInit() : void {



}

ngAfterViewInit(){
  this.id = this.router.snapshot.paramMap.get('id');

this._docor.getDoctorById(this.id).subscribe(
res=>{
this.doctor = res;
this._docor.getAllForm().subscribe(
  res=>{
this.getDoctorAffectation();

this.allForms = res;
 this.allFormsFil =res;

},
err=>{ 


}
);

},
err=>{


}
);



}

response : any;
filterItem(value) {
 this.allFormsFil= this.allForms.filter(p => {
    return (
      p.title.toLowerCase().includes(value.toLowerCase()) ||
      p.title.toLowerCase().includes(value.toLowerCase()) ||
      p.title.toLowerCase().includes(value)
    )
  }) 
}
open(id:any , i: any) {
  const modalRef = this.modalService.open(NgbdModalContent);
  modalRef.componentInstance.idUser = this.id ;
  modalRef.componentInstance.idForm = id ;

  modalRef.componentInstance.i = i ;
  
  }

getDoctorAffectation(){
  this._docor.getDoctorAffectaion(this.id).subscribe(
    res=>{
      this.formAffectations = res;
      
    },
    err=>{
      
    }
  );
}



checkIfFormAffectedToDoctor(form: any){
  let toReturn = false;
   for(let i =0 ; i < this.formAffectations?.length; i++){

     if (this.formAffectations[i].form === form._id){
       toReturn = true;
       break;
     }

   }

   return toReturn;
}





}
