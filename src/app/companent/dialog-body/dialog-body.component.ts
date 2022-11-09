import { Component, OnInit, Inject, Optional,AfterViewInit ,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators,FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})

export class DialogBodyComponent  implements OnInit,AfterViewInit {
   
  constructor(private _fb: FormBuilder,public dialogRef: MatDialogRef<DialogBodyComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private cdref: ChangeDetectorRef ) {
    dialogRef.disableClose = true;
/*     console.log("hhhdhd",this.data) */
   }
  public addmore: FormGroup;

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
/*   initializeForm() {  console.log("jjjj")
    this.addmore.setValue([this.data.dataRange])
} */
errorRange: Boolean = true;
mesgError:number=0;
rangeType:string="";
  ngOnInit() {
 

  	this.addmore = this._fb.group({
  
      itemRows: this._fb.array([this.initItemRows()])
    });
  }
  ngAfterViewInit(): void {
 
      if(this.data.dataRange!=undefined){
      /*   console.log("this.data.dataRange",this.data.dataRange[0].nameRange)  */
        this.rangeType=this.data.dataRange[0].nameRange;
        this.addmore = this._fb.group({
          itemRows: this._fb.array(       
            this.data.dataRange.map(x => {
              return   this._fb.group({
              value: [x.value,[Validators.required]],
              legend:[x.legend,[Validators.required]],
              nameRange:[x.nameRange,[Validators.required]],
            })})
          )
        }) 
/*    console.log("fossrmArr",this.addmore)  */
      }else{
      }
      
      this.cdref.detectChanges();
  }
  get formArr() {
  /*   console.log("formArr",this.addmore) */
    return this.addmore.get('itemRows') as FormArray;
  }
  addRom(){
 /*    console.log("addRom",this.addmore) */
  /*   console.log(this.addmore) */
  }
  closeDialog() {
/*     console.log("length",this.addmore.value.itemRows.length) */
    let i=0;
    let j=0;
/*     do{
      console.log("this.addmore.value.itemRows[i]",this.addmore.value.itemRows[j].value,"this.addmore.value.itemRows[i+1]",this.addmore.value.itemRows[j+1].value)
   j++
   console.log("jjj",j)
    }while(j==this.addmore.value.itemRows.length) */
    for(i;i<this.addmore.value.itemRows.length-1;i++){
        if(this.addmore.value.itemRows[i].value<this.addmore.value.itemRows[i+1].value&&this.addmore.value.itemRows[i+1]){
              j++
            }
     }
   if(this.addmore.value.itemRows.length-1==j){
    /*  console.log("kjdd",this.addmore.value.itemRows) */
    this.dialogRef.close(this.addmore.value.itemRows);}else{
      this.errorRange=false;
      this.mesgError=j+1;
      setTimeout(() => {
        this.errorRange=true;
      }, 5000);

    }
  }
  cancelDialog() {

    this.dialogRef.close("cancelrange");
  }
  initItemRows() {
 /*    console.log("initItemRows",this._fb) */
    return this._fb.group({
      value:[''],
      legend:[''],
      nameRange:['']
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }
  typeRange(){
    this.rangeType="%";
    this.addmore.value.itemRows[0].nameRange="%";
  /*   console.log("%", this.addmore.value.itemRows) */
  }
  typeRangeclose(){
    this.rangeType="";
    this.addmore.value.itemRows[0].nameRange="";
/*     console.log("%", this.addmore.value.itemRows) */
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

}