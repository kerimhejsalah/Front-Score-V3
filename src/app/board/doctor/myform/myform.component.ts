import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DoctorDataService } from '../services/doctor-data.service';

@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements AfterViewInit, OnInit {


  constructor(private _docor : DoctorDataService,
    private router: ActivatedRoute,
    private modalService: NgbModal, 
  

) { }


allForms : any;


id: any;

doctor:any;

affectedToast = false;
affectedToastWithSuccess = false;
statusAbonement=false;
formAffectations : any;
dateFin:any;
selectedDoctor = 0;

 ngOnInit() : void {


}

ngAfterViewInit(){
  this.id = this.router.snapshot.paramMap.get('id');

this._docor.getDoctorById(this.id).subscribe(
res=>{
this.doctor = res;

},
err=>{

}
);


 this._docor.getMyForm(this.id).subscribe(
    res=>{


this.allForms = res;


},
err=>{

}
);
this._docor.getStatusAbonement(this.id ).subscribe((result)=>{
  /* console.log("jjjj",result.doctor)
  console.log("jjjj",result.doctor.length) */
  if(result.doctor.length===0){
    this.statusAbonement=true
  }
  if(result.doctor.length>0)
  if(new Date()>result.doctor[0].datedefin){
    this.statusAbonement=true
  }else{
    this.dateFin=result.doctor[0].datedefin.slice(0,10)

  }
 
})
}

response : any;

open(id:any , i: any) {
  const modalRef = this.modalService.open(NgbdModalContent);
  modalRef.componentInstance.idUser = this.id ;
  modalRef.componentInstance.idForm = id ;

  modalRef.componentInstance.i = i ;
  
  }









}






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
        this.router.navigate(['/admin/doctors/detail' , this.idUser]));

     
      },
      err=>{
      
      }
      );
      
      
      }


      disaffect(f: any){
        

        this._doctor.disaffect(this.idUser, f).subscribe(
          res=>{
            
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/admin/doctors/detail' , this.idUser]));
    
         
          },
          err=>{
            
          }
        );
      
      
      }

}
