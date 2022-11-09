import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DossierService } from '../services/dossier.service';
import { DoctorDataService } from '../../doctor/services/doctor-data.service';
@Component({
  selector: 'app-detail-dossier',
  templateUrl: './detail-dossier.component.html',
  styleUrls: ['./detail-dossier.component.css']
})
export class DetailDossierComponent implements OnInit {


  constructor(private route: ActivatedRoute, 
    private _dossier: DossierService,
    private modalService: NgbModal,
    public path: EndpointService) { }

id: any;
dossier: any;
showSpinner = false;
updateToggle = false;
updateTogglePhoto = false;
open(i: any) {
const modalRef = this.modalService.open(NgbdModalContent);
modalRef.componentInstance.id = this.id ;
modalRef.componentInstance.i = i ;
modalRef.componentInstance.dossier = this.dossier ;




}









ngOnInit(): void {

  this.id = this.route.snapshot.paramMap.get('id');

  this.showSpinner = true;
  
  this._dossier.getdossierById(this.id).subscribe(
  res=>{

  this.dossier = res;
/*   console.log("this.dossier",res) */
  this.showSpinner = false;
  },
  err=>{
  
  
  }
  );
  
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
  @Input() id;
  @Input() dossier;
  @Input() i;




  constructor(public activeModal: NgbActiveModal,private _dossier: DossierService,
    private toastr: ToastrService,
    private router : Router, 
    private _doctor :DoctorDataService

    ) {}


action(){
  if(this.i===1){
    this.deletedossier();
  }else{
    this.updatedossier();
  }
}


newAllDossier =[]
  public deletedossier(){
  //let newAllDossier
    this._dossier.archivedossier(this.id).subscribe(
      res=>{
          this.router.navigate(['/admin/dossier']);
          this._doctor.getAllDoctor().subscribe(
            ress=>{
           ress.map((result)=>{
           /*   console.log(result.liste_dossier) */
             this.newAllDossier =[]
             result.liste_dossier.filter((resultthree)=>{
             /*   console.log(resultthree.id ,this.id) */
               if(resultthree.id != this.id){
                   return this.newAllDossier.push(resultthree)
               }else{
               /*   console.log(2) */
               return null
               }
              return resultthree.id != this.id;
             })
         /*     result.liste_dossier.push({
              checkedone: false,
              dataForms: [],
              id: res._id,
              lengthTab: 0,
              status: false,
              valLenght: false,
        }) */
     /*    console.log(this.newAllDossier) */
        result.liste_dossier=this.newAllDossier
        this._doctor.updateDoctor(result._id ,  result,result.liste_dossier,"autre").subscribe(
          res=>{
          
          },
          err=>{
          }
          ); 
           })
            },
            err=>{
              
            }
          );
 /*          this._doctor.getAllDoctor().subscribe(
            ress=>{
              console.log(ress)
              let m = 0;
              let y = 0;
              for( let i = 0 ; i <ress.length;i++){
                 m = m + 1;
                for( let j = 0 ; j <ress[i].liste_dossier.length;j++){
                  y = y +1;
                  console.log(ress[i].liste_dossier[j])
                  console.log(ress[i]._id)
                  console.log("m",m ,"y",y)
                }
              }
              this.newAllDossier=[]
           ress.filter((result)=>{
           
             result.liste_dossier.filter((resulttow)=>{
              if(this.id!=resulttow.id){
                console.log(this.newAllDossier)
              return this.newAllDossier.push(resulttow)}
             })
           })
           console.log("ddddddddddd",this.newAllDossier) 
            },
            err=>{
              
            }
          ); */ 
          
      },
      err=>{
        
      }
    );
    setTimeout(() => {

    }, 500);

}


updatedossier(){
/*   console.log(this.dossier) */
  this._dossier.updatedossier(this.id ,  this.dossier).subscribe(
  res=>{
  this.toastr.success('dossier mis à jour avec succès! ', 'succès!');
  
  },
  err=>{
 /*    console.log(err); */
    
  this.toastr.error('Erreur dans la modification du dossier ', 'Erreur!');
  }
  );
  }



  

}