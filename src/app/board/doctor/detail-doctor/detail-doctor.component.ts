import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EndpointService } from 'src/app/services/endpoint.service';
import { DoctorDataService } from '../services/doctor-data.service';
import { DossierService } from '../../dossier/services/dossier.service';
import { UploadimageService} from 'src/app/services/uploadimage.service';
import { ImageService } from '../../../image.service';




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
  @Input() doctor;
  @Input() i;




  constructor(public activeModal: NgbActiveModal,private _doctor: DoctorDataService,
    private toastr: ToastrService,
    private router : Router, 
    private _dossierData: DossierService,
    ) {}


action(){
  if(this.i===1){
    this.deletepatient();
  }else{
    this.updatepatient();
  }
}



  public deletepatient(){

    this._doctor.archiveDoctor(this.id).subscribe(
      res=>{
          this.router.navigate(['/admin/doctors']);
      },
      err=>{
        
      }
    );

}

allDosssier=[];
updatepatient(){


  this._dossierData.getAlldossier().subscribe(
    res=>{
      let i=0
      res.map((result)=>{
/*         console.log(result) */
        if(result.status)
        i=i+1 
        else
        this.allDosssier.push(result)
      })
  /*     this.dossiers = res;
      this.totalLength=this.allDosssier.length;
      this.allDossier=  res */
      this.doctor.password=undefined
/*    console.log("this.doctor",this.doctor);  */  
this._doctor.updateDoctor(this.id ,  this.doctor,this.allDosssier,"update").subscribe(
  res=>{
  this.toastr.success('Modification avec succès! ', 'succès!');
  
  },
  err=>{
  this.toastr.error('Erreur ! ', 'erreur dans la modification du docteur!');
  }
  );
      
      
    },
    err=>{
   
      
    }
  );

  }
}






@Component({
  selector: 'app-detail-doctor',
  templateUrl: './detail-doctor.component.html',
  styleUrls: ['./detail-doctor.component.css']
})
export class DetailDoctorComponent implements AfterViewInit, OnInit {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor(private route: ActivatedRoute, 
              private _doctor: DoctorDataService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private router : Router,
              private _iploadImg: UploadimageService,
               public path: EndpointService,
               private imageService: ImageService
              ) { }

  id: any;
  doctor: any;

  updateToggle = false;
  updateTogglePhoto = false;
  open(i:any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = this.id ;
    modalRef.componentInstance.i = i ;
    modalRef.componentInstance.doctor = this.doctor ;
  
  }









  ngOnInit(): void {
   
   
  }
  consentementValid=false
  ngAfterViewInit(){
    this.id = this.route.snapshot.paramMap.get('id');


    this._doctor.getDoctorById(this.id).subscribe(
      res=>{
      /*   console.log("ttte",res) */
      if(res.consontement.length===0){
        this.consentementValid=true
      }
        this.doctor = res;
      },
      err=>{
        
      }
    );
  }






  

url : any;
fileToUpload: any;
imageUrl: any;
handleFileInput(file: FileList) {
  console.log("file",file)
  this.fileToUpload = file.item(0);

  //Show image preview
  let reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  /*   console.log('hhh', this.imageUrl); */
    this._iploadImg.uploadImage(this.imageUrl).subscribe((result)=>{
      
      this.url =result
      this.doctor.photo= result
     /*  console.log("reee", result) */
    })
  };
  reader.readAsDataURL(this.fileToUpload);
}

onAdd(event: any) {

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}
}

showSpinnerUpdatePhoto= false;
updatePhoto(){

  this.showSpinnerUpdatePhoto = true;
  const imageBlob = this.url;
  const file = new FormData();
  file.set('image', imageBlob);
  



  this._doctor.updateDoctorPhoto( this.doctor._id , file).subscribe(

    res=>{


      this.url = null;
      this.showSpinnerUpdatePhoto = false;

      this.ngAfterViewInit();
         
     
    }, 
    err=>{
     
      
  
      
    }
    
  );


}

downloadImage(data) {
 
  this.imageService.download(data);
}
}
