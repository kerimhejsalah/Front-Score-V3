import { Component, OnInit,  Inject ,AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DossierService } from '../../../app/board/dossier/services/dossier.service';
import { Observable } from 'rxjs';
import { DoctorDataService } from 'src/app/board/doctor/services/doctor-data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-dialog-affect-list',
  templateUrl: './my-dialog-affect-list.component.html',
  styleUrls: ['./my-dialog-affect-list.component.css']
})
export class MyDialogAffectListComponent implements OnInit, AfterViewInit  {

  modalTitle: string;
  allDoctors: any;
  allForm: any;
  idDossier:any;
  idDossierById:any;
  getTotalFormAff:[];
  getTableauVrai:[];
  spinerLoading:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,    private _doctor: DoctorDataService,    private router: ActivatedRoute,    private _dossier: DossierService, ) {
  this.modalTitle = data.title;
  this.idDossier=data.dossier;
  this.allForm=data.idAffection;
  this.idDossierById=data.idDossierById

  }

  ngOnInit(): void {
    this.spinerLoading=true
    setTimeout(() => {
      this.spinerLoading=false
    }, 15000);
  }
  ngAfterViewInit(){
  
    this._doctor.getAllDoctor().subscribe(
      res => {
   
        this.allDoctors = res;
       /*  this.modalTitle = res[0].name; */
     
 /*     console.log("  this.allDoctors",  this.modalTitle) */
       /*  console.log("this.totalLength",this.totalLength);  */
        
      },
      err => { }
    );
    
  }
   removeItem(array, item) {
    for(let i = 0; i<array.length; i++){
  /*     console.log(array) */
  /*     if(array[i] == item) {
        array.splice(array.indexOf(item), 1);
      } */
    }
  }
getData(data,type){
  this.spinerLoading=true;
/*   console.log(data,this.idDossier) */
  if(type==2){
 /*    console.log("hiiiiiii",data) */
  let newDataDossier=[];
  let newDataAllFormTrue=[];
  let newDataAllFormFalse=[];
  let tableDataForms = [];

  let i = 0;
 this.allForm.map((res)=>{
  newDataAllFormTrue.push({idForm:res._id,idDossier:this.idDossier._id,status:true});
  newDataAllFormFalse.push({idForm:res._id,idDossier:this.idDossier._id,status:false});
 })
 let m =0;
 let tableDataForms2 = [];
 let tableDataForms23 = [];
/*  console.log('liste_dossierl', data)
 console.log('liste_dossierliste_dossierliste_dossier', data.liste_dossier) */
 data.liste_dossier.map((result)=>{
 /*   console.log("result.id!=this.idDossier 1",this.idDossier) ; */

   if(this.idDossier._id==result.id){
/*  console.log("tableau 0 ",this.idDossier.name,result.lengthTab) */
/*  console.log("tableDataForms 0 ",tableDataForms,tableDataForms2) */
     i= i +1 ;
    newDataDossier.push({id:result.id,dataForms:newDataAllFormTrue,status:true,cheked:true,lengthTab:result.lengthTab,name:result.name,checkedone:true});
   }else{
    m=m+1;
/*     console.log("tableau 11 ",this.idDossier.name,result.lengthTab) */
 /*     console.log("tableau 1",m,this.idDossier.name,) */
    newDataDossier.push({id:result.id,dataForms:newDataAllFormFalse,status:true,cheked:result.cheked,lengthTab:result.lengthTab,name:result.name,checkedone:result.checkedone});
   }
 
    this._dossier.getMyForm(result.id).subscribe(
      res=>{
/*       console.log("result.id!=this.idDossier 1xxxxxxxxxx",result.id,res)   */
        tableDataForms2.push(res)
     
    
    },
    err=>{
    
    }
    );


   if(result.id!=this.idDossier._id){
   this._dossier.getMyForm(result.id).subscribe(
    res=>{
       /* console.log(res[0])  */
       if( res[0]!=undefined){
    res[0].key3=result.id
    tableDataForms23.push(res)}
 
},
err=>{

}
);}

 })
 setTimeout(() => {
/*   console.log(tableDataForms2)  */
  this._dossier.getMyForm(this.idDossier._id).subscribe(
    res=>{
 res[0].key3=this.idDossier._id
 tableDataForms2.unshift(res)

},
err=>{

}
);
 }, 3000);
setTimeout(() => {

  let pp=0;
 /*  console.log("newDataDossier",newDataDossier) */
  tableDataForms2.map((result)=>{
    pp=pp+1
    if(newDataDossier[pp-1]!=undefined){
      if(newDataDossier[pp-1].id==this.idDossierById){
        newDataDossier[pp-1].lengthTab=newDataDossier[pp-1].dataForms.length
      }}
    result.map((resulttow)=>{
      tableDataForms2[0].map((resutthree)=>{
     
        if(resulttow._id==resutthree._id){
          if(newDataDossier[pp-1]!=undefined){
          newDataDossier[pp-1].lengthTab=newDataDossier[pp-1].lengthTab+1}
        } 
      })
    })
  })

}, 5000);

  if(this.allForm.length==0){
   console.log(1)
 }else{
  setTimeout(() => {
    data.liste_dossier=newDataDossier
    this._doctor.updateDoctor(data._id ,  data,newDataDossier,"autre").subscribe(
     res=>{
       res.updateddoctor.liste_dossier.map((result)=>{
         if(result.id==this.idDossier._id){
           this.getTableauVrai=result
         }
       })
     
     },
     err=>{
/*        console.log(12) */
     }
     );
     let affectation2= []
    this.allForm.map((result)=>{
     let affectatione = {
       user: data._id,
       form: result._id
       }
       affectation2.push({
         user: data._id,
         form:   result._id
         })  
 
    })
/*     this._doctor.testGetText().subscribe( res=>{
      console.log("res",res)
},
err=>{
console.log("err",err)
}) */
/*     console.log("kssk",affectation2) */
    this._doctor.affectAllForms(affectation2).subscribe(
     res=>{
      /*  console.log("kk",affectation2) */
     },
     err=>{
    /*   console.log("kssk",affectation2) */
     }
     );
  affectation2.map((result)=>{
 
  })
  }, 6000);
  setTimeout(() => {
    this.spinerLoading=false
  }, 15000);
 }  }else{
   let newDataDossier=[]
   let newDataAllFormFalse=[]
   let i = 0;
  this.allForm.map((res)=>{
  
   newDataAllFormFalse.push({idForm:res._id,idDossier:this.idDossier._id,status:false})
  })
  let m =0;
 /*  console.log("helooolis", data)
  console.log("helooolistedossier", data.liste_dossier) */
   data.liste_dossier.map((result)=>{
     
    if(this.idDossier._id==result.id){
      newDataDossier.push({id:result.id,dataForms:newDataAllFormFalse,status:false,lengthTab:0,cheked:false,checkedone:false})}
      else {
       m=m+1;
     newDataDossier.push({id:result.id,dataForms:newDataAllFormFalse,status:result.status,lengthTab:result.lengthTab-m<0?0:result.lengthTab-m,cheked:result.cheked,checkedone:false})}
   })
   let tableDataForms2 = []
   let tableDataForms23 = []
   let newDataDossierd=[]
   data.liste_dossier.map((result)=>{
     if(this.idDossier._id==result.id){
       i= i +1 ;
       newDataDossierd.push({id:result.id,dataForms:newDataAllFormFalse,status:true,cheked:true,lengthTab:result.lengthTab,checkedone:false})
     }else{
      m=m+1;
   newDataDossierd.push({id:result.id,dataForms:newDataAllFormFalse,status:true,cheked:result.cheked,lengthTab:result.lengthTab,checkedone:false})
     }
  this._dossier.getMyForm(result.id).subscribe(
    res=>{
      tableDataForms23.push(res)
   
 
},
err=>{

}
);
     if(result.id!=this.idDossierById){
     this._dossier.getMyForm(result.id).subscribe(
      res=>{
        if( res[0]!=undefined){
          res[0].key3=result.id
          tableDataForms2.push(res)
        }
   
  },
  err=>{
  
  }
  );}
   })

    setTimeout(() => {
    this._dossier.getMyForm(this.idDossierById).subscribe(
      res=>{
   res[0].key3=this.idDossierById
   tableDataForms2.unshift(res)
  
  },
  err=>{
  
  }
  );
   }, 2500); 
   setTimeout(() => { 
    let pp= 0;
/*     console.log("newDataDossierd",newDataDossierd)
    console.log("tableDataForms2",tableDataForms2)
    console.log("tableDataForms23",tableDataForms23) */
    tableDataForms23.map((result)=>{
      pp=pp+1
/*       console.log("resutthree", newDataDossierd[pp-1].id,pp-1,result)   */
      if(newDataDossierd[pp-1].id==this.idDossierById){
      /*   console.log("hxxxhh", newDataDossierd[pp-1],newDataDossierd[pp-1].id==this.idDossierById,newDataDossierd[pp-1].id,this.idDossier._id)   */
         newDataDossierd[pp-1].lengthTab=0
       }
      result.map((resulttow)=>{
  
        tableDataForms2[0].map((resutthree)=>{
         
      /*     if(newDataDossierd[pp-1].id==this.idDossierById){
           console.log("hxxxhh", newDataDossierd[pp-1],newDataDossierd[pp-1].id==this.idDossierById,newDataDossierd[pp-1].id,this.idDossier._id)  
            newDataDossierd[pp-1].lengthTab=0
          } */
          if(resulttow._id==resutthree._id){
           if( newDataDossierd[pp-1].lengthTab==0){
            newDataDossierd[pp-1].lengthTab=0
           }else{
            newDataDossierd[pp-1].lengthTab=newDataDossierd[pp-1].lengthTab-1
           }
          } 
        })
      })
    })


  }, 5000);
setTimeout(() => {
  data.liste_dossier=newDataDossierd
  this._doctor.updateDoctor(data._id ,  data,newDataDossierd,"autre").subscribe(
    res=>{
   /*  console.log("hi update") */
    },
    err=>{
    }
    );
}, 6000);
setTimeout(() => {
  this.spinerLoading=false
/*   console.log("hi spiner") */
}, 15000);
/* this._doctor.testGetText().subscribe( res=>{
           console.log("rssses",res)
},
err=>{
  console.log("esssrr",err)
}) */
    for( let i=0;i<this.allForm.length ; i++){
      let affectation = {
        user: data._id,
        form:   this.allForm[i]._id
        }
    /*      console.log(affectation)  */
        this._doctor.disaffect(affectation.user, affectation.form).subscribe(
         res=>{
           
         },
         err=>{
           
         }
       ); 
    }

 }
 
}
affect(id: any){
/* 
  let affectation = {
  user: this.idUser,
  form: id
  }
  
  
  this._doctor.affect(affectation).subscribe(
  res=>{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/admin/forms/affect' , this.idForm]));

 
  },
  err=>{
  
  }
  ); */
  
  
  }
  affectAll(id: any,form:any){
    
      let affectation = {
      user: id,
      form: form
      }
      
      
      this._doctor.affect(affectation).subscribe(
      res=>{
     /*    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/forms/affect' , this.idForm])); */
    
     
      },
      err=>{
      
      }
      ); 
      
      
      }
  checkIfFormAffectedToDoctor(form: any){
    /*  console.log("this.getTotalFormAff",this.getTotalFormAff)  */
   let toReturn = false;
   
   for(let i =0 ; i < form.liste_dossier?.length; i++){
    if (form.liste_dossier[i].id==this.idDossier._id&&form.liste_dossier[i].lengthTab==this.allForm.length||form.liste_dossier[i].id==this.idDossier._id&&form.liste_dossier[i].lengthTab>this.allForm.length){
/*      console.log("form.liste_dossier[i].lengthTab",form.liste_dossier[i].lengthTab)
     console.log("this.allForm.length",this.allForm.length) */
      toReturn = true;
      break;
    }
  } 
  
  return toReturn; 
  
  
  }
  getNumberAffecter(j){
         let k = 0 ;

  for(let i =0 ; i < this.allDoctors[j].liste_dossier?.length; i++){
 
    if(this.allDoctors[j].liste_dossier[i].id==this.idDossier._id){
     k=i
    
    }
   }
 /*   console.log("1",this.allDoctors[j].liste_dossier) */
  /*  return this.allDoctors[j].liste_dossier[k].lengthTab   +  ' / ' +this.allForm.length  */
   if(this.allDoctors[j].liste_dossier[k].lengthTab<0 ){
  /*    console.log("1",this.allDoctors[j].liste_dossier[k].lengthTab) */
   return 0   +  ' / ' +this.allForm.length }
   else  if(this.allDoctors[j].liste_dossier[k].lengthTab>this.allForm.length ){
  /*   console.log("12",this.allDoctors[j].liste_dossier[k].lengthTab) */
   return this.allForm.length   +  ' / ' +this.allForm.length }
   else{
 /*    console.log("3",this.allDoctors[j].liste_dossier[k].lengthTab) */
   return this.allDoctors[j].liste_dossier[k].lengthTab   +  ' / ' +this.allForm.length } 

 
}
  disaffect(f: any){

/*     this._doctor.disaffect(this.idUser, f).subscribe(
      res=>{
        
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/forms/affect' , this.idForm]));

     
      },
      err=>{
        
      }
    ); */
  
  
  }
}
