import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DossierEtudServiceService } from '../services/dossier-etud-service.service';
import { FormsDataService } from '../../forms/services/forms-data.service';
import { FormsetudService } from '../../forms/services/formsetud.service';

@Component({
  selector: 'app-affectdossieretud',
  templateUrl: './affectdossieretud.component.html',
  styleUrls: ['./affectdossieretud.component.css']
})
export class AffectdossieretudComponent implements OnInit {


  constructor(private _dossier : DossierEtudServiceService,
    private router: ActivatedRoute,
    private modalService: NgbModal, 
    private _formData: FormsetudService,
  

) { }


allForms : any;


id: any;

dossier:any;

affectedToast = false;
affectedToastWithSuccess = false;
formAffectations : any;

selecteddossier = 0;

 ngOnInit() : void {
/* console.log("iddd",this.router.snapshot.paramMap.get('id')) */
  this.id = this.router.snapshot.paramMap.get('id');

this._dossier.getdossierById(this.id).subscribe(
res=>{
this.dossier = res;

this._formData.getAllForm().subscribe(
  res=>{
   // console.log('tttttttttttttt')
this.getdossierAffectation();

this.allForms = res;


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

open(id:any , i: any) {
  const modalRef = this.modalService.open(NgbdModalContent);
  modalRef.componentInstance.iddossier = this.id ;
  modalRef.componentInstance.idForm = id ;

  modalRef.componentInstance.i = i ;
  
  }

getdossierAffectation(){
  this._dossier.getdossierAffectaion(this.id).subscribe(
    res=>{
/*       console.log("res",res) */
      this.formAffectations = res;
      
    },
    err=>{
      
    }
  );
}



checkIfFormAffectedTodossier(form: any){
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
  @Input() iddossier;
  @Input() idForm;

  @Input() i;




  constructor(public activeModal: NgbActiveModal,
    private _dossier: DossierEtudServiceService,
    private toastr: ToastrService,
    private router : Router, 
    private _formData: FormsetudService,

    ) {}


    action(){
      if(this.i == 1){
          this.affect(this.idForm);
      }else{
        this.disaffect(this.idForm);
      }
    }


    affect(id: any){
  
     this._formData.getFormById(id).subscribe((resForm)=>{
     
      if(resForm.nameAff.length==1&&resForm.nameAff2.length==1&&resForm.nameAff[0].Aff1=="Aucune dossier"&&resForm.nameAff2[0].Aff1=="Aucune dossier")
      {
        this._dossier.getdossierById(this.iddossier).subscribe(
             res=>{
              /*  console.log(res) */
               let affectation = {
                dossier: this.iddossier,
                form: id,
                nameDossier:[{Aff1:res.name,checked:true}],
                }
                
             
                this._dossier.affect(affectation).subscribe(
                res=>{
                  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                  this.router.navigate(['/admin/dossier/affectetud' , this.iddossier]));
          
               
                },
                err=>{
              
                console.log(err);
                
                }
                );
             }
          );
      }else{
        
        this._dossier.getdossierById(this.iddossier).subscribe(
          res=>{
           
            resForm.nameAff.push({Aff1:res.name,cheked: true})
            resForm.nameAff2.push({Aff1:res.name,cheked: true})
            let affectation = {
             dossier: this.iddossier,
             form: id,
             nameDossier:resForm.nameAff,
             }
             
          
             this._dossier.affect(affectation).subscribe(
             res=>{
               this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
               this.router.navigate(['/admin/dossier/affectetud' , this.iddossier]));
       
            
             },
             err=>{
           
             console.log(err);
             
             }
             );
          }
       ); 
      }
     })
      }


      disaffect(f: any){
            /* console.log("hhhhhddd",f) */
            this._formData.getFormById(f).subscribe((resForm)=>{
              //console.log("hhhhhddd",resForm.nameAff.length,resForm.nameAff2.length)
              this._dossier.getdossierById(this.iddossier).subscribe(
                res=>{
                 
                  
                  if(resForm.nameAff.length>1&&resForm.nameAff2.length>1){
                  /*   let i=0;
                     resForm.nameAff.map((resMap)=>{
                      console.log("res",res.name,resMap.Aff1)
                       i++;
                        if(resMap.Aff1==res.name){
                          console.log(i,resForm.nameAff)
                          resForm.nameAff.splice(i-1,i)
                          resForm.nameAff2.splice(i-1,i)
                          console.log(i,resForm.nameAff)
                        }
                     }) */
                   }
                   
          
                }
             ); 
        
            })
        this._dossier.disaffect(this.iddossier, f,"test").subscribe(
          res=>{
            
            
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/admin/dossier/affectetud' , this.iddossier]));
    
         
          },
          err=>{
            
            
          }
        );
      
      
      }

}



