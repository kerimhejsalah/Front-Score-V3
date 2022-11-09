import { AfterViewInit, Component, OnInit,ChangeDetectorRef,ElementRef,ViewChild, } from '@angular/core';
import { DoctorDataService } from '../doctor/services/doctor-data.service';
import { FormsDataService } from '../forms/services/forms-data.service';
import { DataPatientService } from '../patient/services/data-patient.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { DossierService } from '../dossier/services/dossier.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { HistoryService } from 'src/app/services/history.service';
/*  import { UploadClient } from '@uploadcare/upload-client'; */ 
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements  AfterViewInit, OnInit {
  
 /*  client = new UploadClient({ publicKey: '8984836541096889c993' }) */
  constructor(private _doctor: DoctorDataService,
              private _patient: DataPatientService,
              private _form: FormsDataService,
              private _dossier: DossierService,
              private router: Router,
              private _history :HistoryService,
              public fb: FormBuilder,
              private cd: ChangeDetectorRef,
            ) { }

            @ViewChild('fileInput') el: ElementRef;
  doctors: any;
  patients: any;
  forms: any;
  formUpdate:any;
  formsAff:any;
  formAll:any;
  responses: any;

  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  registrationForm = this.fb.group({
    file: [null]
  })  
  editFile: boolean = true;
removeUpload: boolean = false;
  url;
  format;
  payment(price2){
   /*  console.log("paaa",)  */
    this._doctor.payement(price2).subscribe((result)=>{
/*    console.log("result",result)  */
    })
  }
  onSelectFile(event) {
    let readere = new FileReader(); // HTML5 FileReader API
    let filee = event.target.files[0];
 /*    console.log(1,readere,filee) */
    const file = event.target.files && event.target.files[0];
    
    this._doctor.createNewVideo(event.target.files[0])
 /*    console.log(12) */
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
       /*  console.log("thhhh",this.url) */
      
      }
     /*  this.client.uploadFile(event.target.files[0]).then((res)=>{
     
       console.log("res.cdnUrl",res.cdnUrl)
    
      }) */
    }
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
  
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }

  }


  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }


  
  currentYear = new Date().getFullYear();

  
  years = [this.currentYear,this.currentYear-1 , this.currentYear-2, this.currentYear-3, this.currentYear-4, this.currentYear-5, this.currentYear-6, this.currentYear-7];

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Nombre des professionnels de santé inscrits par mois' },
  ];

  lineChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin' , 'Juillet' , 'Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Decembre'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
 
  
  lineChartDataP: ChartDataSets[] = [
    { data: [], label: 'Nombre des patients inscrits par mois' },
  ];
  lineChartDataF: ChartDataSets[] = [
    { data: [], label: 'Nombre des payment par mois' },
  ];
  lineChartDataFT: ChartDataSets[] = [
    { data: [], label: 'Nombre des formulaires ' },
  ];
  lineChartLabelsP: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin' , 'Juillet' , 'Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Decembre'];
  lineChartLabelsF: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin' , 'Juillet' , 'Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Decembre'];
  lineChartLabelsFT: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin' , 'Juillet' , 'Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Decembre'];
  lineChartOptionsP = {
    responsive: true,
  };
  lineChartOptionsF = {
    responsive: true,
  };
  lineChartOptionsFT = {
    responsive: true,
  };
  lineChartColorsP: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#FF1744',
    },
  ];
  lineChartColorsF: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'yellow',
    },
  ];
  lineChartColorsFT: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'green',
    },
  ];
  lineChartLegendP = true;
  lineChartLegendF = true;
  lineChartLegendFT = true;
  lineChartPluginsP = [];
  lineChartPluginsF = [];
  lineChartPluginsFT = [];
  lineChartTypeP = 'line';
  lineChartTypeF = 'bar';
  lineChartTypeFT = 'bar';
  numberFormulAff;
  allForms =[];
  spinerFormulaire = false;
  spinerFormulaireAff = false;
  dataFormAFF;
  taille=0;
  listPayment:any;
  dataAchat:any;
  ngOnInit(): void {  

   /*  this._doctor.history().subscribe((result)=>{
      console.log("huiiiii",result)
      this.listPayment=result.history
      console.log("listPayment",this.listPayment)
    }) */
  }


  ngAfterViewInit(){

    let date = new Date().getFullYear();
   // console.log('ffgf',date)
    this.makeDoctorStatData(date.toString());
    
    this.makePatientStatData(date.toString());
    this.makeFormulaireStatData(date.toString());
    this.makeFormulaireStatDatatAll(date.toString());


    this._form.getFormAffectaionAll().subscribe(
      res=>{        
         this.numberFormulAff=res
      //   this.taille = this.numberFormulAff.taile
      },
      err=>{
        console.log(err)
        
      }
    );
    this._form.getAllForm().subscribe(
      res=>{
     
        this.forms = res;
        if(res.length>0){
          this.spinerFormulaire=true;
        }
        this._form.getAllFormAff().subscribe(
          resq=>{
           
            this.dataFormAFF=resq
            /* this.taille=this.dataFormAFF.length */
            if(resq.length>0){
           
         /*   console.log('ress',this.spinerFormulaire) */
            }
    
          }
        );
        

      }
    );

    this._history.getAllAchat().subscribe((res)=>{
      
       this.dataAchat=res 
       this.taille=this.dataAchat.achat.length
  /*      console.log(this.dataAchat.achat.length) */
       if(res)
       this.spinerFormulaireAff=true
     /*  console.log("this.dataAchat",this.dataAchat.achat) */
    })


  }
  getFormsbyId(id:any){
  /*   console.log(id) */
    this.router.navigate(['/admin/doctors/affect' , id]);
/*     console.log(id,'gg') */
  }
  makePatientStatData(y){
    
    this._patient.getAllPatient().subscribe(
      res=>{
        this.patients = res;
       
        let j=0;
        let f=0;
        let m=0;
        let a=0;
        let ma=0;
        let ju=0;
        let jui=0;
        let ao=0;
        let s=0;
        let o=0;
        let n=0;
        let d=0;
 
 
        for(let i = 0; i<this.patients.length; i++ ){
          let d = this.patients[i].added_date;
           let date = d.substr(5, 2);
           let year = d.substr(0,4);
           date === '01' && year == y ? j++ :
           date === '02' && year == y? f++ :
           date === '03' && year == y? m++ :
           date === '04' && year == y? a++ :
           date === '05' && year == y? ma++ :
           date === '06' && year == y? ju++ :
           date === '07' && year == y? jui++ :
           date === '08' && year == y? ao++ :
           date === '09' && year == y? s++ :
           date === '10' && year == y? o++ :
           date === '11' && year == y? n++ :
           date === '12' && year == y? d++ : null
 
           
          
        }
         
        this.lineChartDataP[0].data = [j , f, m , a , ma, ju ,  jui , ao , s , o , n , d];
 
       }
     
      
    );
  }
  makeFormulaireStatData(y){
    // AJOUTT DATE AFFEC
    this._history.getAllAchat().subscribe(
      res=>{
        this.spinerFormulaireAff=true
        this.numberFormulAff=res
        this.formsAff = this.numberFormulAff.achat;
       
        let j=0;
        let f=0;
        let m=0;
        let a=0;
        let ma=0;
        let ju=0;
        let jui=0;
        let ao=0;
        let s=0;
        let o=0;
        let n=0;
        let d=0;
 
       
     /*   console.log("this.formsAff[i].created_date",this.formsAff
       ) */
        for(let i = 0; i<this.formsAff.length; i++ ){
/*        console.log("this.formsAff[i].created_date",this.formsAff[i].created_date) */
          let d = this.formsAff[i].datedebut;
           let date = d.substr(5, 2);
           let year = d.substr(0,4);
           date === '01' && year == y ? j++ :
           date === '02' && year == y? f++ :
           date === '03' && year == y? m++ :
           date === '04' && year == y? a++ :
           date === '05' && year == y? ma++ :
           date === '06' && year == y? ju++ :
           date === '07' && year == y? jui++ :
           date === '08' && year == y? ao++ :
           date === '09' && year == y? s++ :
           date === '10' && year == y? o++ :
           date === '11' && year == y? n++ :
           date === '12' && year == y? d++ : null
 
           
          
        }
         
        this.lineChartDataF[0].data = [j , f, m , a , ma, ju ,  jui , ao , s , o , n , d];
 
       }
     
      
    );
  }
  makeFormulaireStatDatatAll(y){
    this._form.getAllForm().subscribe(
      res=>{
        this.formAll = res;
       
        let j=0;
        let f=0;
        let m=0;
        let a=0;
        let ma=0;
        let ju=0;
        let jui=0;
        let ao=0;
        let s=0;
        let o=0;
        let n=0;
        let d=0;
        for(let i = 0; i<this.formAll.length; i++ ){
          let d = this.formAll[i].created_date;
           let date = d.substr(5, 2);
           let year = d.substr(0,4);
           date === '01' && year == y ? j++ :
           date === '02' && year == y? f++ :
           date === '03' && year == y? m++ :
           date === '04' && year == y? a++ :
           date === '05' && year == y? ma++ :
           date === '06' && year == y? ju++ :
           date === '07' && year == y? jui++ :
           date === '08' && year == y? ao++ :
           date === '09' && year == y? s++ :
           date === '10' && year == y? o++ :
           date === '11' && year == y? n++ :
           date === '12' && year == y? d++ : null
 
           
          
        }
         
        this.lineChartDataFT[0].data = [j , f, m , a , ma, ju ,  jui , ao , s , o , n , d];
 
       }
     
      
    );
  }
  makeDoctorStatData(y){
   
    
    this._doctor.getAllDoctor().subscribe(
      res=>{
        this.doctors = res;
   
       let j=0;
       let f=0;
       let m=0;
       let a=0;
       let ma=0;
       let ju=0;
       let jui=0;
       let ao=0;
       let s=0;
       let o=0;
       let n=0;
       let d=0;


       for(let i = 0; i<this.doctors.length; i++ ){
         let d = this.doctors[i].added_date;
         
         
          let date = d.substr(5, 2);
          let year = d.substr(0,4);
          
          date === '01' && year == y ? j++ :
          date === '02' && year == y ? f++ :
          date === '03' && year == y ? m++ :
          date === '04' && year == y ?  a++ :
          date === '05' && year == y ? ma++ :
          date === '06' && year == y ? ju++ :
          date === '07' && year == y ? jui++ :
          date === '08' && year == y ? ao++ :
          date === '09' && year == y ? s++ :
          date === '10' && year == y ? o++ :
          date === '11' && year == y ? n++ :
          date === '12' && year == y ? d++ : null

          
         
       }
        
       this.lineChartData[0].data = [j , f, m , a , ma, ju ,  jui , ao , s , o , n , d];

      }
    );
  }

}
