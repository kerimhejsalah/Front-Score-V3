import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DoctorEtudDataService } from '../../doctor/services/doctor-etud-data.service';
import { FormsetudService } from '../services/formsetud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DossierService } from '../../dossier/services/dossier.service';
import { DossierEtudServiceService} from '../../dossier/services/dossier-etud-service.service'
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
    private _doctor: DoctorEtudDataService,
    private toastr: ToastrService,
    private router : Router, 
    private _dossierData: DossierEtudServiceService,

    ) {}
    idDoctor:any;
    dataDoctor=[];
    dataTab:any;
    getIdDoctor(doctor_id ){

     this.idDoctor=doctor_id
    }
    allDosssier=[];
    statusFormAff:boolean=false;
    action(){
      if(this.i == 1){
           this.affect(this.idForm);  
           let newDaataForms = []
           let newDaataForms2 = []
           
           this._doctor.getDoctorById(this.idUser).subscribe((result)=>{
            this.dataDoctor.push(result)
            this.dataTab=result
            result.liste_dossier.map((res)=>{
              
          // console.log(res)
            })
            setTimeout(() => {
             
              for (let m = 0; m < this.dataTab.liste_dossier.length; m++){
             /*    if(tableDataForms2[0][k]._id==tableDataForms2[i][m]._id)
                {
                  x= x+1; */
                    
                  for (let b = 0; b < newDaataForms.length; b++){
                   let v=0;
                   if(this.dataTab.liste_dossier[m].id==newDaataForms[b].id){
                    this.dataTab.liste_dossier[m].lengthTab=newDaataForms[b].lengthTab
                    this.dataTab.liste_dossier[m].checkedone=true
                   /* console.log(this.dataTab.liste_dossier[m]) */}

                }
              }
           /*    console.log(result) */
          /*     console.log(newDaataForms,newDaataForms2,this.dataTab.liste_dossier)  */
              this._doctor.updateDoctor(this.idUser ,  result,this.dataTab.liste_dossier,"autre").subscribe(
                res=>{
         /*        this.toastr.success('Modification avec succès! ', 'succès!'); */
                
                },
                err=>{
                /* this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!'); */
                }
                );
        
             }, 500);
          })
      
      }else{
        let newDaataForms = []
        let newDaataForms2 = []
        this._doctor.getDoctorById(this.idUser).subscribe((result)=>{
          this.dataDoctor.push(result)
          this.dataTab=result
          result.liste_dossier.map((res)=>{
            
            this._dossierData.getMyForm(res.id).subscribe(
              ress=>{
          
              ress.map((resulttow)=>{
              
                if(resulttow._id==this.idForm){
                /*   console.log(res.id) */
                  this._doctor.getDoctorById(this.idUser).subscribe((resutlthre)=>{
               
                    resutlthre.liste_dossier.map((resultfor)=>{
               /*        if(resultfor.id==res.id){
                      resultfor.lengthTab=resultfor.lengthTab-1
                      result.liste_dossier=resutlthre.liste_dossier
                      console.log(resultfor.lengthTab,result.liste_dossier,resutlthre.liste_dossier)
                        } */
                        if(resultfor.id==res.id) {
                       
                          resultfor.lengthTab=resultfor.lengthTab-1
                          resultfor.checkedone=true
                         /*  console.log("tete",resultfor.checkedone,resultfor.id) */
                          result.liste_dossier=resutlthre.liste_dossier
                          newDaataForms.push(resultfor)
                           }
                           else{
                            newDaataForms2.push(resultfor)
                           }
                    })
               /*      this._doctor.updateDoctor(this.idUser ,  result,resutlthre.liste_dossier,"autre").subscribe(
                      res=>{
                      this.toastr.success('Modification avec succès! ', 'succès!');
                      
                      },
                      err=>{
                      this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!');
                      }
                      ); */
                  })
                
                }
              })
          },
          err=>{
          
          }
          )
        /*     if(res.cheked || res.lengthTab>0){
              let i = 0;
              let j = 0;
              result.liste_dossier.map((resulttow)=>{
                i = i + 1;
               resulttow.dataForms.map((resultthree)=>{
                j = j + 1;
               if(resultthree.idForm==this.idForm){
                result.liste_dossier[i-1].cheked=false
               
                if(result.liste_dossier[i-1].lengthTab>0)
               { 
                result.liste_dossier[i-1].lengthTab=result.liste_dossier[i-1].lengthTab-1}
               else{
                result.liste_dossier[i-1].lengthTab=0
               }
                this._doctor.updateDoctor(this.idUser ,  result,result.liste_dossier,"autre").subscribe(
                  res=>{
                  this.toastr.success('Modification avec succès! ', 'succès!');
                  
                  },
                  err=>{
                  this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!');
                  }
                  );
               }
               })
              })
            } */
          })
          setTimeout(() => {
             
            for (let m = 0; m < this.dataTab.liste_dossier.length; m++){
           /*    if(tableDataForms2[0][k]._id==tableDataForms2[i][m]._id)
              {
                x= x+1; */
                  
                for (let b = 0; b < newDaataForms.length; b++){
                 let v=0;
                 if(this.dataTab.liste_dossier[m].id==newDaataForms[b].id){
                  this.dataTab.liste_dossier[m].lengthTab=newDaataForms[b].lengthTab
                  this.dataTab.liste_dossier[m].checkedone=false
               /*   console.log(this.dataTab.liste_dossier[m]) */}

              }
            }
       /*      console.log(newDaataForms,newDaataForms2,this.dataTab.liste_dossier)  */
            this._doctor.updateDoctor(this.idUser ,  result,this.dataTab.liste_dossier,"autre").subscribe(
              res=>{
      /*         this.toastr.success('Modification avec succès! ', 'succès!'); */
              
              },
              err=>{
         /*      this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!'); */
              }
              );
      
           }, 500);
        })
        
      /*   console.log(" this.statusFormAff222", this.statusFormAff) */
        this.disaffect(this.idForm);
       /*  this.disaffect(this.idForm);  */
    
  /*       this._dossierData.getAlldossier().subscribe(
          res=>{
            let i=0
            res.map((result)=>{
              if(result.status)
              i=i+1 
              else
              this.allDosssier.push(result)
            })
            }) */
 /*            if(!this.statusFormAff)
         setTimeout(()=>{
              console.log(this.allDosssier, this.dataDoctor)
              this._doctor.updateDoctor(this.idUser ,  this.dataDoctor[0],this.allDosssier,"autre").subscribe(
                res=>{
                this.toastr.success('Modification avec succès! ', 'succès!');
                
                },
                err=>{
                this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!');
                }
                );
            } , 2000); */
            
   

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
        this.router.navigate(['/admin/forms/affectetud' , this.idForm]));

     
      },
      err=>{
      
      }
      );
      
      
      }


      disaffect(f: any){

        this._doctor.disaffect(this.idUser, f).subscribe(
          res=>{
            
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/admin/forms/affectetud' , this.idForm]));
    
         
          },
          err=>{
            
          }
        );
      
      
      }

}



@Component({
  selector: 'app-affectetud',
  templateUrl: './affectetud.component.html',
  styleUrls: ['./affectetud.component.css']
})
export class AffectetudComponent implements OnInit, AfterViewInit {


  constructor(private _docor: DoctorEtudDataService,

              private router: ActivatedRoute, 
              private _formData: FormsetudService,
              public path: EndpointService,
              private _auth: AuthService,
              private modalService: NgbModal, 
              private snackBar:MatSnackBar,
              private _doctor: DoctorEtudDataService,

        ) { }


  allDoctors : any;


  id: any;

  form:any;
  affectedToast = false;
  affectedToastWithSuccess = false;


  selectedDoctor = 0;

  formAffectations : any;

  open(id:any , i: any) {
    console.log(id,i)
    if(this.form.formMuti[0].formulCalcul=='0'){
      this.snackBar.open(" Veuillez ajouter la formule calculée dans le formulaire "+this.form.title ,"×", {
        duration: 5000,
        // here specify the position
        verticalPosition: 'top'
      });
    }else{
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.idUser = id ;
    modalRef.componentInstance.idForm = this.id ;
  
    modalRef.componentInstance.i = i ;}
    
    }




  ngOnInit(): void {

    //console.log(111)

  }

  ngAfterViewInit(){
    this.id = this.router.snapshot.paramMap.get('id');
 //console.log(this.id)  

    
    this._formData.getFormById(this.id).subscribe(
      res=>{
        this.form = res;
  /*       console.log(this.form); */
        this._docor.getAllDoctor().subscribe(
          res=>{
            this.allDoctors = res;
            this.getFormAffectation();
          },
          err=>{
            
          }
        );
      },
      err=>{
        
      }
    );


     
 




  }






  getFormAffectation(){
   /*  console.log(this.id) */
    this._formData.getFormAffectaion(this.id).subscribe(
      res=>{
        this.formAffectations = res;
     
        
      },
      err=>{
      
        
      }
    );
  }




  checkIfFormAffectedToDoctor(doctor: any){

     let toReturn = false;
      for(let i =0 ; i < this.formAffectations?.length; i++){
    /*     console.log(1) */
      /*   console.log(this.formAffectations[i].user === doctor._id) */
        if (this.formAffectations[i].user === doctor._id){
       /*    console.log(2) */
          toReturn = true;
          break;
        }

      }

      return toReturn;
  }






  response : any;
  affect(id: any){

    let affectation = {
      user: id,
      form: this.id
    }


    this._formData.affect(affectation).subscribe(
      res=>{
      this.ngOnInit();
      },
      err=>{
    
        
      }
    );


  }

  disaffect(user: any){

    this._formData.disaffect(user, this.id).subscribe(
      res=>{
  
        
        this.ngOnInit();
      },
      err=>{
   
        
      }
    );


  }



}
