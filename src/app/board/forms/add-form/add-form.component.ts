import { AfterContentChecked, AfterViewInit, Component, HostListener, OnDestroy, OnInit, ElementRef, Directive, } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { FormsDataService } from '../services/forms-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EndpointService } from 'src/app/services/endpoint.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Options, LabelType, ChangeContext, PointerType } from 'ng5-slider';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../../companent/dialog-body/dialog-body.component';
import { UploadimageService } from 'src/app/services/uploadimage.service';
interface SliderDetails {
  value: number;
  floor: number;
  ceil: number;
  showTicks: boolean;
  index: number;
  step: number;
  i: number;
  s: number;

}
class saintAntoine {
  id: number;
  nameCotation: string
}
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit, AfterViewInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(private formService: FormsDataService,
    private toastr: ToastrService,
    private router: Router,
    public endpoint: EndpointService,
    public matDialog: MatDialog,
    private _iploadImg: UploadimageService,
    public element: ElementRef,
    private _fb: FormBuilder) {
    this.productForm = this._fb.group({
      name: '',
      quantities: this._fb.array([]),
    });
  }
  adjust() {
    const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
    textArea.style.maxHeight = '100px';
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    /*   e.target.style.space = "0px"; */
    e.target.style.height = (e.target.scrollHeight + 30) + "px";
  }
  public productForm: FormGroup;
  public addmore: FormGroup;
  _cotationName: saintAntoine[];
  sliderControl: FormControl = new FormControl(0);
  logText: string = '';
  animal: string;
  sliderReturn: Boolean = false;
  name: string;
  update: string;
  scoreRange: number;
  value: number = 0;
  minValue: number = 10;
  maxValue: number = 90;
  dataRange: [];
  listOfOptions = [

    { "name": "Anglais", ID: "D2", checked: false },
    { "name": "Français", ID: "D1", checked: false },
  ]
  formClone: any;
  in = 0;
  j = 0;
  form = {

    title: '',
    description: '',
    date: null,
    genre: 'homme',
    lang: "Français",
    sections: [],
    formule: '+',
    messages: [],
    calculeFormule: [
      {
        formulCalcul: "",
        val: [{
          value: null,
          descValue: ""
        }],
        indexScoreForm: []
      }
    ]
  }
  staticUrl = '';
  staticUrlQuestion = '';
  countError = 0;
  testFormule = false;
  result: any;
  ready = true;
  ValueInputForm: string = "";
  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  pelviennes: any;
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }
  newQuantity(): FormGroup {
    return this._fb.group({
      qty: '',
      price: '',
    })
  }
  CHANGELanguage(val) {
    console.log(val);
    this.form.lang = val
  }
  addQuantity(k) {
    /*   console.log("kkkk",k) */
    /*       this.quantities().push(this.newQuantity());  
          this.form.calculeFormule[k].val=this.productForm.value.quantities
           console.log(" console.log(,this.productForm.value.quantities)",this.productForm.value.quantities) */
    this.form.calculeFormule[k].val.push({
      value: 0,
      descValue: ""
    })
    /*      console.log(" console.log(,this.productForm.value.quantities)",this.form.calculeFormule[k].val) */
  }
  removeQuantity(k: number, z: number) {
    /*      this.form.messages. */
    this.form.calculeFormule[k].val.splice(z, 1);
    /*   console.log(" console.log(,this.productForm.value.quantities)",k,z) */
    //this.quantities().removeAt(i);  
  }
  onSubmit() {
    /*  console.log(this.productForm.value);   */
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }
  getCotation() {
    this._cotationName = [
      { id: 0, nameCotation: "Absent/Pas du tout" },
      { id: 1, nameCotation: "Faible/Un peu" },
      { id: 2, nameCotation: "Modére/Moyennement" },
      { id: 3, nameCotation: "Fort/Beaucoup" },
      { id: 4, nameCotation: "Extrémement fort/Extrément" },
    ]
  }
  get formArr() {
    /*   console.log("formArr",this.addmore) */
    return this.addmore.get('itemRows') as FormArray;
  }
  addRom() {
    /*    console.log("addRom",this.addmore) */
    /*    console.log(this.addmore) */
  }
  onChange(event, i, o, s, type) {
    this.form.sections[s].questions[i].optionsSaint[o].hint = type;
    /*   console.log("event", this.form.sections[s].questions[i].optionsSaint[o])
      console.log("evensssst",event.target.name,i,o,s)
      console.log("type",type) */
  }
  initItemRows() {
    /*    console.log("initItemRows",this._fb) */
    return this._fb.group({
      value: [''],
      legend: [''],
      nameRange: ['']
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  openDialog(i, s) {
    /* console.log(",,,,",i,s) */
    /*  console.log("this.form.sections[s].questions[i].dataRange",this.form.sections[s].questions[i].dataRange) */
    if (this.form.sections[s].questions[i].dataRange == undefined) {
      this.update = "new"
    } else {

      this.update = "update"
    }
    this.matDialog.open(DialogBodyComponent, {

      data: { dataRange: this.form.sections[s].questions[i].dataRange, update: this.update, indexI: i, indexS: s, nameRange: i + " " + "," + " " + s, rangeType: this.form.sections[s].questions[i].typRange }
    })
      .afterClosed()
      .subscribe(response => {
        if (response == "cancelrange") {
          if (this.form.sections[s].questions[i].dataRange) {
            this.form.sections[s].questions[i].rangeBoolean = true;
          } else {
            this.form.sections[s].questions[i].rangeBoolean = false;
            this.form.sections[s].questions[i].option.ceil = 0;
          }
        } else {
          console.log("rrrr", response)
          this.form.sections[s].questions[i].rangeBoolean = true;
          this.form.sections[s].questions[i].typRange = response[0].nameRange
          this.form.sections[s].questions[i].option.ceil = response[response.length - 1].value;
          this.form.sections[s].questions[i].dataRange = response;
          this.dataRange = response;
          setTimeout(() => {
            this.dataRange = undefined
          }, 1000);
        }
      });

  }

  options: Options = {
    floor: 10,
    ceil: 100,
    step: 10,
    showTicks: true,
    translate: (value: number, label: LabelType): string => {

      /*  return  value + '%' ; */
      if (value == 20) {
        return value + '<b></b> %' + "douleurs peu intenses";
      } else {
        return value + '<b></b>% ';
      }



    },
    getPointerColor: (value: number): string => {
      if (value == 30) {
        return 'red';
      }
      if (value == 60) {
        return 'orange';
      }
      if (value == 90) {
        return 'yellow';
      }
      return '#333';
    },

    /*  stepsArray: [
      {value: 0, legend: '<div class="row"  style="padding-right:100px"><h3>aucune distension</h3></div>'},
      {value: 10},
      {value: 20},
      {value: 30, legend: '<div class="row"><h3>distension  peu importante</h3></div>'},
      {value: 40},
      {value: 50, legend: '<div class="row"><h3>distension  assez importante</h3></div>'},
      {value: 60},
      {value: 70, legend: '<div class="row"><h3>distension importante</h3></div>'},
      {value: 80},
      {value: 90},
      {value: 100, legend: '<div class="row"><h3>distension  trés importante</h3></div>'}
    ], 
     */
  }
  sliders: SliderDetails[] = [

  ];

  sliderOptions(slider): Options {

    return {
      floor: 10,
      ceil: 100,
      step: 10,
      showTicks: true,
      showOuterSelectionBars: true,

      stepsArray: slider.dataRange,
      translate: (value: number): string => {
        if (slider.dataRange != undefined) {
          if (slider.dataRange[0].nameRange != undefined)

            return value + slider.dataRange[0].nameRange;
        }
      },

      /*  getPointerColor: (value: number): string => {
         if (value == 30) {
             return 'red';
         }
         if (value == 60) {
             return 'orange';
         }
         if (value == 90) {
             return 'yellow';
         }
         return '#333';
      }, */

    };


  }

  newRange(i: any, s: any) {
    /*   console.log("ddd",i,s) */
    /*    this.sliders.push({
         value: 0,
         floor: 0,
         ceil: 100,
         showTicks: true,
         index: 0 ,
         step: 10 ,
         i:i,
         s:s,
       }) */
  }
  setNewType(newCeil: string, i: any, s: any): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    /*   const newOptions: Options = Object.assign({}, this.form.sections[s].questions[i].option);
      newOptions.ceil = newCeil;
      console.log('newOptions',i,s,newOptions)
     this.scoreRange=newCeil; */
    // this.form.sections[s].questions[i].maxRange=newCeil
    // this.form.sections[s].questions[i].option.ceil=newCeil;
  }
  setNewCeil(newCeil: number, i: any, s: any): void {
    if (newCeil > 100) {
      /*  console.log('ggg',i,s) */
    } else {
      /*    console.log('ggg',i,s) */
      // Due to change detection rules in Angular, we need to re-create the options object to apply the change
      const newOptions: Options = Object.assign({}, this.form.sections[s].questions[i].option);

      newOptions.ceil = newCeil;
      /*   console.log('newOptions',i,s,newOptions) */
      this.scoreRange = newCeil;
      this.form.sections[s].questions[i].maxRange = newCeil
      this.form.sections[s].questions[i].option.step = 20;
      this.form.sections[s].questions[i].option.ceil = newCeil;
    }
  }


  ngOnInit(): void {
    this.getCotation();
    //this.addQuantity(0);
    setTimeout(() => this.adjust(), 0);
    /*     console.log(this.productForm.value);  
        console.log("eeee",this._cotationName) */
    this.createNewSection();
    this.addmore = this._fb.group({

      itemRows: this._fb.array([this.initItemRows()])
    });
  }
  countNumberOfQuestion(s, ind) {


    let count = 0;
    for (let i = 0; i < s; i++) {
      count += this.form.sections[i].questions.length;
      // console.log('count', ind);

    }
    count += ind;

    return count + 1;
  }
  ngAfterViewInit() {

  }
  drop(event: CdkDragDrop<any[]>, i: any) {
    moveItemInArray(this.form.sections[i].questions, event.previousIndex, event.currentIndex);
  }
  handleChange(event) {
    this.form.genre = event;
    /*   console.log(this.form.genre); */


  }
  getIndex(obj) {
    //console.log("obj",obj)
    setTimeout(() => {
      return;
    }, 50)
    return this.sliderOptions(obj)
  }
  deleteMessage(m: any) {
    this.form.messages.splice(m, 1);
  }
  deleteFormCalule(m: any) {
    this.form.calculeFormule.splice(m, 1);
  }
  createNewMessage() {
    this.form.messages.push({
      score: '',
      message: '',
    });
  }
  createNewFormule() {
    /*   this.productForm.value.quantities=[] */
    /*  this.productForm = this._fb.group({  
       name: '',  
       quantities: this._fb.array([]) ,  
     });   */
    this.form.calculeFormule.push({
      formulCalcul: "",
      val: [{
        value: null,
        descValue: ""
      }],
      indexScoreForm: [{ i: 0, j: 0, k: 0, desc: "", type: "" }]
    })
    /*  console.log(' this.form.calculeFormule', this.form.calculeFormule) */
  }
  createNewFormMutli() {
    /*    console.log('4444') */
  }
  createNewSection() {
    /*  console.log("hhhees",this.form.sections) */
    this.form.sections.push(
      {

        title: '',
        description: '',
        next: 0,
        questions: [
          {

            title: '',
            type: 'Text court',
            image: '',
            hint: '',
            numberJourCmnt: '',
            score: 0,
            minRange: 0,
            maxRange: 0,
            option: {
              value: 1,
              floor: 0,
              ceil: 100,
              showTicks: true,
              step: 10
            },
            dataRange: this.dataRange,
            rangeBoolean: true,
            typRange: "",
            obligatoire: false,
            switch: false,
            options: [
              { text: '', score: 0, image: '', hint: '', next: '', textecourt: false }
            ],
            optioncm: [
              { text: '', score: 0, image: '', hint: '', next: '', textecourt: false }
            ],
            optionsSaint: [
              { text: '', score: 0, image: '', hint: '', next: '' }
            ],

            grille: {
              options: [{
                title: ''
              }],
              textecourt: false,
              scoreS: [{
                title: '',
                score: 0
              }]
            }
          }
        ],


      }
    );


  }
  removeOptionGrille(i: any, o: any, s: any) {

    this.form.sections[s].questions[i].grille.options.splice(o, 1);
  }
  removeOptionGrille2(i: any, o: any, s: any) {

    this.form.sections[s].questions[i].grille.scoreS.splice(o, 1);
  }
  onAddForm() {

    /*     console.log("test form",this.form) */
  }
  createNewQuestion(section: any) {
    console.log(this.form)
    this.form.sections[section].questions.push(
      {

        title: '',
        type: 'Text court',
        image: '',
        hint: '',
        numberJourCmnt: '',
        score: 0,
        minRange: 0,
        maxRange: 0,
        option: {
          value: 1,
          floor: 0,
          ceil: 100,
          showTicks: true,
          step: 10
        },
        dataRange: this.dataRange,
        rangeBoolean: true,
        typRange: "",
        switch: false,
        obligatoire: false,
        options: [
          { text: '', score: 0, image: '', hint: '', next: '', textecourt: false }
        ],
        optioncm: [
          { text: '', score: 0, image: '', hint: '', next: '', textecourt: false }
        ],
        optionsSaint: [
          { text: '', score: 0, image: '', hint: '', next: '' }
        ],
        grille: {
          options: [{
            title: ''
          }],
          textecourt: false,
          scoreS: [{
            title: '',
            score: 0
          }]
        }
      }
    );


  }
  test(i, o, s) {
    /*    console.log('  this.form.sections[i].questions.grille',this.form.sections[o].questions) */
    //  this.form.sections[i].questions[0].grille.options.push({title:''})
    // this.form.sections[i].questions.grille.options[o].push({title:''})
  }
  duplicateNewQuestion(section: any, index: any) {
    /*    var suits = ["hearts", "clubs", "Brooks Brothers", "diamonds", "spades"]; */

    this.form.sections[section].questions.splice(index, 0, {

      title: this.form.sections[section].questions[index].title,
      type: this.form.sections[section].questions[index].type,
      image: this.form.sections[section].questions[index].image,
      hint: this.form.sections[section].questions[index].hint,
      numberJourCmnt: this.form.sections[section].questions[index].numberJourCmnt,
      score: 0,
      minRange: 0,
      maxRange: 0,
      option: {
        value: 1,
        floor: 0,
        ceil: 100,
        showTicks: true,
        step: 10
      },
      dataRange: this.form.sections[section].questions[index].dataRange,
      rangeBoolean: true,
      typRange: this.form.sections[section].questions[index].typRange,
      switch: false,
      obligatoire: false,
      options: this.form.sections[section].questions[index].options,
      optioncm: this.form.sections[section].questions[index].optioncm,
      optionsSaint: this.form.sections[section].questions[index].optionsSaint,
      grille: this.form.sections[section].questions[index].grille,
    });
    /* console.log(this.form.sections[section].questions) */
    /* console.log(suits);
         console.log("this.form.sections[section].questions",this.form.sections[section].questions) 
        console.log(section,index)
        this.form.sections[section].questions.push(
          {
    
            title:this.form.sections[section].questions[index].title,
            type:this.form.sections[section].questions[index].type,
            image:this.form.sections[section].questions[index].image,
            hint:this.form.sections[section].questions[index].hint,
            numberJourCmnt:this.form.sections[section].questions[index].numberJourCmnt,
            score: 0,
            minRange:0,
            maxRange:100,
            option:{
              value: 1,
              floor: 0,
              ceil: 100,
              showTicks: true,
              step:10
            },
            dataRange:this.form.sections[section].questions[index].dataRange,
            rangeBoolean:true,
            typRange:this.form.sections[section].questions[index].typRange,
            switch: false,
            obligatoire: false,
            options:this.form.sections[section].questions[index].options,
            optioncm: this.form.sections[section].questions[index].optioncm,
            optionsSaint:this.form.sections[section].questions[index].optionsSaint,
        
          }
        ); */


  }
  switcher(s: any, q: any) {
    for (let question of this.form.sections[s].questions) {
      question.switch = false;
      /*     console.log("ddd",question.switch)  */
}
    /*       console.log("this.form.sections[s].questions[q].switch",this.form.sections[s].questions[q].switch)
          console.log("!this.form.sections[s].questions[q].switch",!this.form.sections[s].questions[q].switch) */
    this.form.sections[s].questions[q].switch = !this.form.sections[s].questions[q].switch;
  }
  changeType(ind: any, type: any, s: any) {

    this.form.sections[s].questions[ind].type = type;
  }



  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList, s: any, type) {
    this.fileToUpload = file.item(0);
    if (type == "CM") {
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        /*   console.log('hhh', this.imageUrl); */
        this._iploadImg.uploadImage(this.imageUrl).subscribe((result) => {
          /*   
            this.url =result
            this.doctor.photo= result */
          /*     console.log("reee", result) */
          this.result = result;
          this.form.sections[s].questions[this.in].optioncm[this.j].image = this.result;
          this.result = null;



          this.staticUrl = '';
        })
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        /*   console.log('hhh', this.imageUrl); */
        this._iploadImg.uploadImage(this.imageUrl).subscribe((result) => {
          /*   
            this.url =result
            this.doctor.photo= result */
          /* console.log("reee", result) */
          this.result = result;
          /*  this.form.sections[s].questions[this.in].optioncm[this.j].image = this.result; */
          this.form.sections[s].questions[this.in].options[this.j].image = this.result;
          this.result = null;



          this.staticUrl = '';
        })
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }


  onAdd(event: any, s: any, type) {
    /*   console.log(type) */
    if (type == "CM") {
      if (event.target.files && event.target.files[0]) {
        /*    console.log(555) */
        var reader = new FileReader();
        let file = new FormData();
        file.append('image', event.target.files[0]);
        reader.onload = (event: any) => {
          this.staticUrl = event.target.result;
          this.formService.uploadImage(file).subscribe(
            res => {
              this.result = res;
              /*   console.log("this.form.sections[s].questions[this.in].optioncm[this.j].image",this.form.sections[s].questions[this.in].optioncm[this.j].image) */
              this.form.sections[s].questions[this.in].optioncm[this.j].image = this.result.image;
              this.result = null;



              this.staticUrl = '';
            },
            err => {


            }
          )





        }
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      /*     console.log(12) */
      var reader = new FileReader();
      let file = new FormData();
      file.append('image', event.target.files[0]);
      reader.onload = (event: any) => {
        this.staticUrl = event.target.result;
        this.formService.uploadImage(file).subscribe(
          res => {
            this.result = res;
            /*    console.log("this.form.sections[s].questions[thisssss.in].optioncm[this.j].image",this.form.sections[s].questions[this.in].optioncm[this.j].image) */
            this.form.sections[s].questions[this.in].options[this.j].image = this.result.image;
            this.result = null;



            this.staticUrl = '';
          },
          err => {


          }
        )





      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  viewForm(q) {
    this.ValueInputForm += this.ValueInputForm + " " + q
    /*     console.log(this.ValueInputForm) */
  }
  deleteImageOption(image: any, i: any, o: any, s: any, type) {
    /*     console.log(type) */
    if (type == "CC")
      this.formService.deleteImage(image).subscribe(
        res => {
          this.form.sections[s].questions[i].options[o].image = "";
          /*       console.log("this.form.sections[s].questions[i].options[o].image",this.form.sections[s].questions[i].options[o].image) */

        },
        err => {
          /*      console.log("eesse",err) */

        }
      )
    else
      this.formService.deleteImage(image).subscribe(
        res => {
          this.form.sections[s].questions[i].optioncm[o].image = "";
          /*     console.log("this.form.sections[s].questions[i].options[o].imagssse",this.form.sections[s].questions[i].options[o].image) */

        },
        err => {
          /*     console.log("eee",err) */

        }
      )
  }
  deleteImage(image: any, i: any, o: any, s: any) {
    this.formService.deleteImage(image).subscribe(
      res => {
        this.form.sections[s].questions[i].options[o].image = '';


      },
      err => {


      }
    )
  }
  public getNumber(v: string, val1, val2, k, val) {
    /*      console.log("v",v,"vall",val,"val1",val1,"val22",val2,"k",k)  */
    if (this.waitForSecondNumber) {
      this.currentNumber = v;

      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
      this.form.calculeFormule[k].formulCalcul === '0' ? this.form.calculeFormule[k].formulCalcul = v : this.form.calculeFormule[k].formulCalcul += v;

    }
    if (val == 1) {
      // console.log("77777",this.form.calculeFormule[k].indexScoreForm) 
      if (this.form.calculeFormule[k].indexScoreForm.length == 1 && this.form.calculeFormule[k].indexScoreForm[0].type == "") {
        this.form.calculeFormule[k].indexScoreForm[0].i = val1
        this.form.calculeFormule[k].indexScoreForm[0].j = val2
        this.form.calculeFormule[k].indexScoreForm[0].type = "index"

      } else {
        this.form.calculeFormule[k].indexScoreForm.push({ i: val1, j: val2, k: 0, desc: "", type: "index" })
      }
    } else {
      if (v == "+" || v == "-" || v == "×" || v == "/") {
        if (this.form.calculeFormule[k].indexScoreForm.length == 1 && this.form.calculeFormule[k].indexScoreForm[0].type == "") {
          this.form.calculeFormule[k].indexScoreForm[0].desc = v
          this.form.calculeFormule[k].indexScoreForm[0].type = "operation"
        } else {
          this.form.calculeFormule[k].indexScoreForm.push({ i: 0, j: 0, k: 0, desc: v, type: "operation" })
        }
      }
      if (v == "0" || v == "1" || v == "2" || v == "3" || v == "4" || v == "5" || v == "6" || v == "7" || v == "8" || v == "9") {
        /*  console.log( this.form.calculeFormule[k].indexScoreForm[0].k) */


        if (this.form.calculeFormule[k].indexScoreForm.length == 1 && this.form.calculeFormule[k].indexScoreForm[0].type == "") {
          /*  console.log(1) */
          this.form.calculeFormule[k].indexScoreForm[0].k = Number(v)
          this.form.calculeFormule[k].indexScoreForm[0].type = "number"
        } else {
          /*    console.log(2) */
          /*  console.log( this.form.formMuti[k].indexScoreForm[this.form.formMuti[k].indexScoreForm.length-1] , v) */
          if (this.form.calculeFormule[k].indexScoreForm[this.form.calculeFormule[k].indexScoreForm.length - 1].type === "number") {
            const concat = '' + this.form.calculeFormule[k].indexScoreForm[this.form.calculeFormule[k].indexScoreForm.length - 1].desc.toString() + '' + v.toString();
            this.form.calculeFormule[k].indexScoreForm[this.form.calculeFormule[k].indexScoreForm.length - 1].desc = Number(concat)
            /*            this.form.formMuti[k].indexScoreForm.push({i:0,j:0,k:0,desc:Number(concat),type:"number"}) */
          } else {
            this.form.calculeFormule[k].indexScoreForm.push({ i: 0, j: 0, k: 0, desc: Number(v), type: "number" })
          }
        }
      }
      if (v == "(" || v == ")" || v == ",") {
        if (this.form.calculeFormule[k].indexScoreForm.length == 1 && this.form.calculeFormule[k].indexScoreForm[0].type == "") {
          this.form.calculeFormule[k].indexScoreForm[0].desc = v
          this.form.calculeFormule[k].indexScoreForm[0].type = "autre"
        } else {
          this.form.calculeFormule[k].indexScoreForm.push({ i: 0, j: 0, k: 0, desc: v, type: "autre" })
        }
      }
    }
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op, secondOp) {
    switch (op) {
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '=':
        return secondOp;
    }
  }
  public getOperation(op: string) {
    /*     console.log(op); */

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);

    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    /*     console.log(this.firstOperand); */

  }

  public clear(k) {

    this.currentNumber = '0';
    this.form.calculeFormule[k].formulCalcul = '0'
    this.form.calculeFormule[k].indexScoreForm = [{ i: 0, j: 0, k: 0, desc: '', type: '' }]
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
  removeCau() {
    this.currentNumber.substring(0, this.currentNumber.length - 1);
    /*   console.log( this.currentNumber.slice(0,-4)) */
  }
  removeOption(i: any, o: any, s: any) {

    this.form.sections[s].questions[i].options.splice(o, 1);
  }
  removeOptionCm(i: any, o: any, s: any) {

    this.form.sections[s].questions[i].optioncm.splice(o, 1);
  }
  removeSaint(i: any, o: any, s: any) {
    this.form.sections[s].questions[i].optionsSaint.splice(o, 1);
  }



  testFormTitle = false;
  testFormSections = false;
  testFormQuestions = false;
  testFormileScore = false;
  changeFormTitle() {
    if (this.form.title.length !== 0) {
      this.testFormTitle = false;
    } else {
      this.testFormTitle = true;
    }
  }
  data;
  Registers(regForm: NgForm) {
    if (regForm.valid) {
      this.data = regForm.value
      /* console.log(this.data) */
    }
  }
  createNewForm() {
    console.log(this.form)
    this.testFormule = false;
    this.testFormTitle = false;
    this.testFormSections = false;
    this.testFormQuestions = false;
    this.countError = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let c = 0;
    let v = 0;
    let b = 0;
    let k = 0;
    let n = 0;
    this.form.sections.map((result) => {
      x = x + 1;
      result.questions.map((resulttow) => {
        y = y + 1;

        if (resulttow.type == "Choix multiples") {
          z = z + 1;

          resulttow.optioncm.map((resultthree) => {
            /*     console.log("resulttow",resultthree) */
            if (resultthree.text.length == 0) {
              this.countError++;
              this.toastr.warning(
                `Les options de la question  ${x
                } sont obligatoires`
              );
            }


          })
        }
        if (resulttow.type == "Cases à cocher") {
          c = c + 1;

          resulttow.options.map((resultthree) => {
            /*  console.log("resulttow",resultthree) */
            if (resultthree.text.length == 0) {
              this.countError++;
              this.toastr.warning(
                `Les options de la question  ${x
                } sont obligatoires`
              );
            }


          })
        }

        if (resulttow.type == "Grille de cases à cocher 2") {
          k = k + 1;
          resulttow.grille.options.map((resultfor) => {
            if (resultfor.title.length === 0) {

              /* console.log("resultfor",resultfor.title) */
              this.countError++;
              this.toastr.warning(
                `Les options Lignes de la question  ${k
                } sont obligatoires`
              );
            }
          })
          resulttow.grille.scoreS.map((resultfive) => {
            if (resultfive.title.length === 0) {
              this.countError++;
              this.toastr.warning(
                `Les options Colonnes de la question  ${k
                } sont obligatoires`
              );
              /*    console.log("resultfive",resultfive.title) */
            }
          })
        }
      })

    })
    this.form.calculeFormule.map((res) => {
      if (res.formulCalcul.length < 11) {
        this.countError++;
        this.toastr.warning(
          `Le formule de calcule est obligatoire`
        );
        /*    console.log(res.formulCalcul.length<11) */
      }
    })
    if (this.form.formule.length == 0) {
      this.testFormule = true;
      this.countError++;
    }
    if (this.form.title.length === 0) {
      this.testFormTitle = true;
      this.countError++;

    }

    this.testFormSections = this.form.sections.some((section, idx) => {
      /*    if (section.title.length === 0) {
           this.toastr.warning(
             `Le titre de section N° ${idx + 1} est obligatoire`
           );
         } */
      this.testFormQuestions = Array.from(section.questions).some(
        (question: any, index) => {
          if (question.title.length === 0) {
            this.toastr.warning(
              `Le titre de question N° ${index + 1} de section N° ${idx + 1
              } est obligatoire`
            );
          }
          return question.title.length === 0;
        }
      );
      /*      return section.title.length === 0; */
    });

    if (this.testFormSections) {
      this.countError++;
    }
    if (this.testFormQuestions) {
      this.countError++;
    }

    if (this.countError == 0) {
      for (let i = 0; i < this.form.sections.length; i++) {

        for (let j = 0; j < this.form.sections[i].questions.length; j++) {
          //   console.log("resultresultresult", this.form.sections[i].questions[j])
          let ressss = []
          if (this.form.sections[i].questions[j].dataRange == undefined) {
            ressss.push({ grille: this.form.sections[i].questions[j].grille, hint: this.form.sections[i].questions[j].hint, image: this.form.sections[i].questions[j].image, maxRange: this.form.sections[i].questions[j].maxRange, minRange: this.form.sections[i].questions[j].minRange, numberJourCmnt: this.form.sections[i].questions[j].numberJourCmnt, obligatoire: this.form.sections[i].questions[j].obligatoire, option: this.form.sections[i].questions[j].option, optioncm: this.form.sections[i].questions[j].optioncm, options: this.form.sections[i].questions[j].options, optionsSaint: this.form.sections[i].questions[j].optionsSaint, rangeBoolean: this.form.sections[i].questions[j].rangeBoolean, score: this.form.sections[i].questions[j].score, switch: this.form.sections[i].questions[j].switch, title: this.form.sections[i].questions[j].title, typRange: this.form.sections[i].questions[j].typRange, type: this.form.sections[i].questions[j].type, dataRange: [{ value: 0, legend: "", nameRange: "" }] })
          }
          // console.log("ressss", ressss)
          if (this.form.sections[i].questions[j].dataRange == undefined) {
            this.form.sections[i].questions[j] = ressss[0]
          } else {
            this.form.sections[i].questions[j].dataRange.push({ value: 0, legend: "", nameRange: "" })
          }

          // console.log("resultresultresult3333333333", this.form.sections[i].questions[j])
        }


      }
      if (this.form.messages.length == 0) {

        this.form.messages.push(
          { score: '', message: '' })

      }
      /*       console.log("yeyeeeeeeeeeeeeyeyeye",this.form) */
      this.formService.createNewForm(this.form).subscribe(
        (res) => {

          if (!res) {
            this.toastr.warning(
              'Formulaire c déja exit',

            );
          } else {
            this.toastr.success('Formulaire créé avec succès! ', 'succès!');
            this.router.navigate(['/admin/forms']);
          }
        },
        (err) => {
          this.toastr.error(
            'Erreur dans la création du formulaire! ',
            'Erreur!'
          );
        }
      );
    }



  }


  deleteQuestion(i: any, s: any) {
    /*    console.log(i,s) */
    this.form.sections[s].questions.splice(i, 1);
  }


  deleteSection(s: any) {

    this.form.sections.splice(s, 1);
  }



  onAddQuestion(event: any, s: any) {
    /*   console.log("gggg",event) */
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let file = new FormData();
      file.append('image', event.target.files[0]);
      reader.onload = (event: any) => {
        this.staticUrlQuestion = event.target.result;
        this.formService.uploadImage(file).subscribe(
          res => {
            this.result = res;
            this.form.sections[s].questions[this.in].image = this.result.image;
            this.result = null;


            this.staticUrlQuestion = '';
          },
          err => {


          }
        )





      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  deleteImageQuestion(image: any, i: any, s: any) {
    this.formService.deleteImage(image).subscribe(
      res => {
        this.form.sections[s].questions[i].image = '';


      },
      err => {


      }
    )
  }





}
