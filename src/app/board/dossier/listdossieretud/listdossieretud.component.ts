import { Component, OnInit } from '@angular/core';
import { DossierService } from '../services/dossier.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyDialogAffectListComponent } from 'src/app/companent/my-dialog-affect-list/my-dialog-affect-list.component';
import { DossierEtudServiceService } from '../services/dossier-etud-service.service';
@Component({
  selector: 'app-listdossieretud',
  templateUrl: './listdossieretud.component.html',
  styleUrls: ['./listdossieretud.component.css']
})
export class ListdossieretudComponent implements OnInit {

  constructor(private _dossierData: DossierEtudServiceService,public dialog: MatDialog) { }

  dossiers: any;
  page:number=1;
  totalLength:any;
  allDossier:any;
  allDosssier=[];
  listIdAffection;
  spinerLoading:boolean=true;
  ngOnInit(): void {
/*     this. openModal() */
setTimeout(() => {
  this.spinerLoading=false
}, 4500);
    this._dossierData.getAlldossier().subscribe(
      res=>{
        let i=0
        console.log("rrrr",res)
        res.map((result)=>{
          if(result.status)
          i=i+1 
          else
          this.allDosssier.push(result)
        })
        this.dossiers = res;
        this.totalLength=this.allDosssier.length;
        this.allDossier=  res
     /*  console.log(this.allDosssier);   */
        
        
      },
      err=>{
     
        
      }
    );
  }
  openModal(id) {
    this._dossierData.getdossierById(id).subscribe(
      result=>{
        this._dossierData.getMyForm(id).subscribe(
          res=>{
    if(res){
 /*      console.log("this.listIdAffection0",this.allDossier,id)  */
      const dialogConfig = new MatDialogConfig();
      dialogConfig.backdropClass='backdropBackground';
      dialogConfig.panelClass='dialog-container-custom' ;
      dialogConfig.hasBackdrop=false;
      dialogConfig.backdropClass="cdk-overlay-backdrop";
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose=true;
      dialogConfig.width="100%";
      dialogConfig.data = {
      id: 1,
      title: result.name,
      idAffection:res,
      dossier:result,
      idDossierById:id
      };
      const dialogRef = this.dialog.open(MyDialogAffectListComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
  /*    console.log( 'Dialog was closed' ) 
    console.log(result)  */
    if(result){
   /*    console.log("result",result) */
      this.spinerLoading=true
      setTimeout(() => {
        this.spinerLoading=false
      }, 15000);
    }
      });
    }
    
      
      /* console.log("this.allForms",this.allForms) */
      },
      err=>{
      
      }
      );
      
      },
      err=>{
      
      }
      ); 

 
    }
  filterItem(value) {
      this.allDosssier = this.dossiers.filter(p => {
        return (
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.name.toLowerCase().includes(value)
        )
      }) 
    }
    getIdDossier(id){
  /*     console.log(id)
      this._dossierData.getMyForm(id).subscribe(
        res=>{
  console.log("cc",res) 

    
    },
    err=>{
    
    }
    );
      this._dossierData.getdossierById(id).subscribe(
        res=>{
       console.log(res)
        
        },
        err=>{
        
        }
        ); */
    }

}
