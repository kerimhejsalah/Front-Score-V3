import { AfterViewInit, Component, OnInit,Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DossierEtudServiceService } from '../../dossier/services/dossier-etud-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsetudService } from '../services/formsetud.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      <p>Êtes-vous sûr de supprimer ce formulaire?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">non</button>
      <button type="button" class="btn btn-danger" (click)="deleteForm(); activeModal.close()">oui</button>
   
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;

  constructor(public activeModal: NgbActiveModal, private _formData: FormsetudService,
    private route : Router,
    ) {
   /*    console.log("id",this.id) */

    }
    
 /*    public barChartLables :Label[] = ['2006','2007','2008','2009','2010','2011','2012'];
    public barChartType:ChartType ='bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];
    public barChartData: ChartDataSets[] = [
      {
        data: [65, 59, 80, 81, 56, 55, 40],label: 'Series A'
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],label: 'Series B'
      }
    ] */
  public deleteForm(){

    this._formData.archiveForm(this.id).subscribe(
      res=>{
          this.route.navigate(['/admin/forms']);
      },
      err=>{
        this.route.navigate(['/admin/forms']);
        
      }
    );

}
public openTab(){
/*   console.log("ddd") */
}

}

@Component({
  selector: 'app-liste-forms-etud',
  templateUrl: './liste-forms-etud.component.html',
  styleUrls: ['./liste-forms-etud.component.css']
})
export class ListeFormsEtudComponent implements OnInit {

  constructor(
    private _formData: FormsetudService,
    private _dossier: DossierEtudServiceService,
    private modalService: NgbModal,
    private router : Router, 
    
    ) {   }

  forms: any;
  dossier: any;
  listeDossierSelect:any;
  listeDossier = [{_id:-1,
  name:"Aucune dossier",cheked:false}];
  selectedDossier = '';
  idDisaff ;
  formAffectations : any;
  totalLength:any;
  page:number=1;
  allForms:any;
  mesgEmpty: boolean=false;
  affEmpty: boolean=false;
  nameDossier: string;
  allFrormsNumber;
  ngOnInit(): void {
    
  }
  public options2 = [
    {"id": 1, "name": "a"},
    {"id": 2, "name": "b"},
    {"id": 3, "name": "c"}
  ]
  public selected2 = this.options2[1].id;
  ngAfterViewInit(){

    this._dossier.getAlldossier().subscribe(
      res=>{
       
        this.dossier = res;
   
    res.map((res)=>{

 if(res.status)
    return null
    else
    return this.listeDossier.push({_id:res._id,name:res.name,cheked:false})
    })
    this.listeDossierSelect = this.listeDossier
   // console.log("yyyyyyyyy",this.listeDossierSelect )
/*   this.listeDossierSelect = this.listeDossier
  console.log(this.listeDossierSelect) */
 /*  setTimeout(() => {
    this.listeDossierSelect.splice(0,1) 
  }, 1000); */
/*   this.listeDossierSelect.splice(0,1)  */
  /*   this.listeDossier.splice(0,1) */
  /*   console.log(this.listeDossier)  */
  
      }
      
    );
    this._formData.getAllForm().subscribe(
      res=>{
        this.forms = res;
        this.allForms=res;
        this.totalLength=res.length;
      //   console.log("ress",res)
     /*   for(let i=0;i<300;i++){
        console.log('forms',this.forms[i].formMuti[0].val[0],i,"title" ,this.forms[i].title) 
       } */
      },
      err=>{
     
        
      }
    );
  }
  onChange(data: any){
    this.mesgEmpty=false;
    if(data.length == 0){
      this._formData.getAllForm().subscribe(
        res=>{
          this.forms = res;
          this.allForms=res;
       
        },
        err=>{
       
        }
      );
    }else{
      this._dossier.getMyForm(data).subscribe(
        res=>{
   
          this.forms = res;
          this.allForms =res;
 
          if(res.length==0){
            this.mesgEmpty=true
            this.listeDossier.map((res)=>{
              if(res._id==data){
                this.nameDossier=res.name
              }
            })
        
          }
        
        }
      );
    } 
    
  }
  filterItem(value) {
    this.allForms=  this.forms.filter(d => {
        return (
          d.title.toLowerCase().includes(value.toLowerCase()) 
        )
      })  
      this.allFrormsNumber=this.allForms.length
    }
    functionTest(text,nameAff2){
      /*    console.log(nameAff2) */
          return true
        }
        testData(test,data){
          this.listeDossier.map((res)=>{
        /*     console.log(res) */
            if(res.cheked=true){
              res.cheked=false
            }
            if(res.name==data[0].Aff1){
            this.idDisaff=res._id
            }
          })
          test.nameAff=this.listeDossier
          test.nameAff2.map((result)=>{
      
            test.nameAff.map((result2)=>{
              if(result.Aff1==result2.name){
                result.cheked=true
                result2.cheked=true
             }
            })
          })
      
      
        }
        getData(data){
          this.listeDossier.map((res)=>{
            if(res.name==data[0].Aff1){
            this.idDisaff=res._id
            }
          })
        }
        disaffect(id,iddossier,form){
          form.nameAff.map((resultId)=>{
            if(resultId.cheked){
           /*    console.log(resultId) */
              if(form.nameAff2[0].Aff1=="Aucune dossier"){
                /*   form.nameAff[0].cheked=true */
              
                }else{
             /*  console.log(resultId._id,id) */
               this._dossier.disaffect(resultId._id,id,"aucun").subscribe(
                  res=>{
                    
            
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                    this.router.navigate(['/admin/dossier/affectetud' , this.idDisaff]));
            
                 
                  },
                  err=>{
                    console.log("errerrerrerr",err)
                    
                  }
                ); }
            }
          })
      
        
        
        }
        open() {
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.id = "eeeeeee" ;
      
          modalRef.dismissed.subscribe(value=>{
          //this.deleteForm();
        
        
      });
      }
      
        affect(id,iddossier,item){
     // console.log(1)
         this.affEmpty=false;
         this._formData.getFormById(id).subscribe((ress)=>{
         // console.log(2)
          ress.nameAff2.map((matDialog)=>{
         
            if(matDialog.Aff1==item.name){
          //    console.log(3)
              this.affEmpty=true;
            
             var filtered = ress.nameAff2.filter(function(value, index, arr){ 
           
              return value.Aff1 != matDialog.Aff1;
          });
         // console.log(4)
            this.listeDossier.map((res)=>{
       
              if(res._id==iddossier){
              //  console.log(5)
                ress.nameAff2.push({Aff1:res.name,cheked:true})
                   if(ress.nameAff2[0].Aff1=="Aucune dossier"&&ress.nameAff2.length>1){
                       ress.nameAff2.splice(0,1)
                      } 
                     // console.log(6)
                         if(ress.nameAff2.length==2){
                        //  console.log(7)
                          let affectation = {
                            dossier: iddossier,
                            form: id,
                            nameDossier:[{Aff1:"Aucune dossier",checked:false}],
                            
                            }
                         //   console.log(8)
                            this._dossier.affect(affectation).subscribe(
                              res=>{
                             //   console.log(9)
                                this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                                this.router.navigate(['/admin/dossier/affectetud' , iddossier])); },
                              err=>{
                  
                                 console.log(err);
                    
                            }
                       );
                         }else{
                        //  console.log(10)
                        let affectation = {
                          dossier: iddossier,
                          form: id,
                          nameDossier:filtered,
                          }
                          this._dossier.affect(affectation).subscribe(
                            res=>{
                        //      console.log(11)
                              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                              this.router.navigate(['/admin/dossier/affectetud' , iddossier])); },
                            err=>{
                
                               console.log(err);
                  
                          }
                     );}
                        
                 }
              })}
          })
               this.listeDossier.map((res)=>{
             //   console.log(12,this.listeDossier)
            if(res._id==iddossier&&!this.affEmpty){
           //   console.log(13)
              ress.nameAff2.push({Aff1:res.name,cheked:true})
          //  console.log(ress.nameAff2) 
                 if(ress.nameAff2[0].Aff1=="Aucune dossier"&&ress.nameAff2.length>1){
               //   console.log(14)
                     ress.nameAff2.splice(0,1)} 
                      let affectation = {
                        dossier: iddossier,
                        form: id,
                        nameDossier:ress.nameAff2,
                        }
                          this._dossier.affect(affectation).subscribe(
                          res=>{
                     //       console.log(15)
                            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                            this.router.navigate(['/admin/dossier/affectetud' , iddossier])); },
                          err=>{
              
                             console.log(err);
                
                        }
                   );
               }
            })
          })
         // console.log("item",id,iddossier)
      
      
            
            
            }
}
