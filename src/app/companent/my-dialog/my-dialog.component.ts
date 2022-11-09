import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DossierService } from '../../../app/board/dossier/services/dossier.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  modalTitle: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,    
              private _dossier: DossierService) {
    this.modalTitle = data.title;
    }
nameDossier:any;
  ngOnInit(): void {
    this.nameDossier=this.data.title
  }
open(i,j,title,form,index){
 


  if(j==1){
    if(form.dossierAff[0].nameDossier=="Aucune dossier"){
    // console.log("afff",this.data.title)
    let affectation = {
     dossier: this.data.id,
     form: i,
     nameDossier:[{nameDossier:this.data.title,id:this.data.id}],
     
     }
  
     this._dossier.affectDossier(affectation).subscribe(
       res=>{
    /*      console.log(res); */
     /*     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(['/admin/dossier/affect' , iddossier])); */ },
       err=>{
 
       /*    console.log(err); */
 
     }
 )}else{
   
   form.dossierAff.push({nameDossier:this.data.title,id:this.data.id})
   let affectation = {
     dossier: this.data.id,
     form: i,
     nameDossier:form.dossierAff ,
     
     }
  
     this._dossier.affectDossier(affectation).subscribe(
       res=>{
    /*      console.log(res); */
     /*     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(['/admin/dossier/affect' , iddossier])); */ },
       err=>{
 
       /*    console.log(err); */
 
     }
 )
 
 }}
   else{
 /*   console.log("deff")
   console.log(form.dossierAff,"title")
   console.log(this.data.index,"title") */
 
  
   if(form.dossierAff.length==1){
 
   let affectation = {
     dossier: this.data.id,
     form: i,
     nameDossier:[{nameDossier:"Aucune dossier",id:""}],
     
     }
     this._dossier.affectDossier(affectation).subscribe(
       res=>{
   /*       console.log(res); */
     /*     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(['/admin/dossier/affect' , iddossier])); */ },
       err=>{
 
   /*        console.log(err); */
 
     }
 );}else{
  
   let k=0
   form.dossierAff.map((result)=>{
     k=k+1
     if(result.nameDossier==this.data.title){
      /*  console.log(result.nameDossier,"result.nameDossier")
       console.log(this.data.title,"this.data.title")
        console.log(k,"hello") */
        form.dossierAff.splice(k-1 , 1);
     }
   })
   let affectation = {
     dossier: this.data.id,
     form: i,
     nameDossier:form.dossierAff,
     
     }
     this._dossier.affectDossier(affectation).subscribe(
       res=>{
   /*       console.log(res); */
     /*     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(['/admin/dossier/affect' , iddossier])); */ },
       err=>{
 
   /*        console.log(err); */
 
     }
 );}
 } 


}
checkIfFormAffectedToDoctor(form: any){
  if(form.dossierAff!=undefined){
 let toReturn = false;
for(let i =0 ; i < form.dossierAff?.length; i++){

  if (form.dossierAff[i].id==this.data.id){
    toReturn = true;
    break;
  }
}

return toReturn; 

}
}
updatedossier(){
  this.data.formId.name=this.nameDossier;
  this._dossier.updatedossier(this.data.formId._id ,  this.data.formId).subscribe(
  res=>{
  //this.toastr.success('dossier mis à jour avec succès! ', 'succès!');
  
  },
  err=>{
    console.log(err);
    
 // this.toastr.error('Erreur dans la modification du dossier ', 'Erreur!');
  }
  );
  }
}
