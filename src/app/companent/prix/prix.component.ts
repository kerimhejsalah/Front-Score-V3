import { Component, OnInit,Injectable,Inject,VERSION } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormControl , FormArray, FormBuilder, Validators, NgForm} from '@angular/forms';
import { PrixService } from '../../../app/services/prix.service';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
interface cPaypal {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.css']
})

export class PrixComponent implements OnInit {
  currencyPaypal: cPaypal[] = [
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
  ];
  form: FormGroup;
  form2: FormGroup;
  description:string;
  desc:string;
  title:string;
  prix:string;
  currency:string;
  desc2:string;
  title2:string;
  prix2:string;
  currency2:string;
  fileToUpload:any;
  validData:boolean=false;
  validData2:boolean=false;
  selectCurrency:string="USD";
  selectCurrency2:string="USD";
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PrixComponent>,
    private http :HttpClient,
    private snackBar:MatSnackBar,
    private _prix: PrixService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
}

  ngOnInit(): void {
    this.form = this.fb.group({
      desc: [this.desc, []],
      title: [this.title, []],
     prix: [this.prix, []],
     currency: [this.currency, []],
  });
  this.form2 = this.fb.group({
    desc2: [this.desc2, []],
    title2: [this.title2, []],
   prix2: [this.prix2, []],
   currency2: [this.currency2, []],
});
  this._prix.getPrixForm().subscribe((result)=>{
  /*   console.log("result",result[0].prix) */
    this.desc=result[0].desc;
    this.title=result[0].title;
    this.prix=result[0].prix;
    this.currency=result[0].currency
    this.form = this.fb.group({
      desc: [this.desc, []],
      title: [this.title, []],
     prix: [this.prix, []],
     currency: [this.currency, []],
  });
 
  })
  this._prix.getPrixForman().subscribe((result)=>{
    /*   console.log("result",result[0].prix) */
      this.desc2=result[0].desc;
      this.title2=result[0].title;
      this.prix2=result[0].prix;
      this.currency2=result[0].currency
      this.form2 = this.fb.group({
        desc2: [this.desc2, []],
        title2: [this.title2, []],
       prix2: [this.prix2, []],
       currency2: [this.currency2, []],
    });
   
    })
  }
  change(value:any){
 
    this.selectCurrency=value
 
  }
  change2(value:any){
 
    this.selectCurrency2=value
 
  }
  save() {
    this.form.value.currency=this.selectCurrency2
    if(this.form.value.desc.length>0&&this.form.value.title.length>0&&this.form.value.prix.length>0&&this.form.value.currency.length>0){
      this.validData=false
    this.dialogRef.close(this.form.value);
    this.snackBar.open(" Les nouveaux prix est ajoutée." ,"×", {
      duration: 2000,
      // here specify the position
      verticalPosition: 'top'
    });
  }else{
    this.validData=true
    setTimeout(() => {
      this.validData=false
    }, 3000);

  }
}
saveAn() {

  this.form2.value.currency2=this.selectCurrency

  if(this.form2.value.desc2.length>0&&this.form2.value.title2.length>0&&this.form2.value.prix2.length>0&&this.form2.value.currency2.length>0){
    this.validData2=false
  this.dialogRef.close(this.form2.value);
  this.snackBar.open(" Les nouveaux prix est ajoutée." ,"×", {
    duration: 2000,
    // here specify the position
    verticalPosition: 'top'
  });
}else{
  this.validData2=true
  setTimeout(() => {
    this.validData2=false
  }, 3000);

}
}
saveAll(){
  if(this.form2.value.desc2.length>0
    &&this.form2.value.title2.length>0
    &&this.form2.value.prix2.length>0
    &&this.form2.value.currency2.length>0
    &&this.form.value.desc.length>0
    &&this.form.value.title.length>0
    &&this.form.value.prix.length>0
    &&this.form.value.currency.length>0
    &&this.form.value.prix>0
    &&this.form2.value.prix2){

  this._prix.addPrixFormAn(this.form2.value).subscribe((res)=>{
  this.close()
  })
  this._prix.addPrixForm(this.form.value).subscribe((res)=>{
    this.close()

  })
  this.snackBar.open(" Les nouveaux prix est ajoutée." ,"×", {
    duration: 2000,
    // here specify the position
    verticalPosition: 'top'
  });
}else{
  if(this.form2.value.desc2.length>0&&this.form2.value.title2.length>0&&this.form2.value.prix2.length>0&&this.form2.value.currency2.length>0&&this.form2.value.prix2){

  }else{
    this.validData2=true
    setTimeout(() => {
      this.validData2=false
    }, 3000);
  }
  if(this.form.value.desc.length>0&&this.form.value.title.length>0&&this.form.value.prix.length>0&&this.form.value.currency.length>0&&this.form.value.prix){

  }else{
    this.validData=true
    setTimeout(() => {
      this.validData=false
    }, 3000);
  }
  }

  
}
close(){
  this.dialogRef.close(false);
}
}
