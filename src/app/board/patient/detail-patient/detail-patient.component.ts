import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/image.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { UploadimageService } from 'src/app/services/uploadimage.service';
import { DataPatientService } from '../services/data-patient.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements AfterViewInit, OnInit  {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor(private route: ActivatedRoute, 
    private _patient: DataPatientService,
    private modalService: NgbModal,
    private _iploadImg: UploadimageService,
    private imageService: ImageService,
    public path: EndpointService) { }

id: any;
patient: any;
showSpinner = false;
updateToggle = false;
updateTogglePhoto = false;
open(i: any) {
const modalRef = this.modalService.open(NgbdModalContent);
modalRef.componentInstance.id = this.id ;
modalRef.componentInstance.i = i ;
modalRef.componentInstance.patient = this.patient ;




}









ngOnInit(): void {


}

consentementValid=false
ngAfterViewInit(){
  this.id = this.route.snapshot.paramMap.get('id');

  this.showSpinner = true;
  
  this._patient.getPatientById(this.id).subscribe(
  res=>{
    console.log(res.consontement.length)
    if(res.consontement.length===0){
      this.consentementValid=true
    }
  this.patient = res;
  this.showSpinner = false;
  },
  err=>{
  
  
  }
  );
}



url : any;
fileToUpload: any;
imageUrl: any;
handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

  //Show image preview
  let reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
/*     console.log('hhh', this.imageUrl); */
    this._iploadImg.uploadImage(this.imageUrl).subscribe((result)=>{
      
      this.url =result
      this.patient.photo= result
    /*   console.log("reee", result) */
    })
  };
  reader.readAsDataURL(this.fileToUpload);
}
downloadImage(data) {
 
  this.imageService.download(data);
}

onAdd(event: any) {

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      //  this.url = event.target.result;
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
  



  this._patient.updatePatientPhoto( this.patient._id , file).subscribe(

    res=>{


      this.url = null;
      this.showSpinnerUpdatePhoto = false;

      this.ngAfterViewInit();
         
     
    }, 
    err=>{
     
      
  
      
    }
    
  );


}



}





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
  @Input() patient;
  @Input() i;




  constructor(public activeModal: NgbActiveModal,private _patient: DataPatientService,
    private toastr: ToastrService,
    private router : Router, 

    ) {}


action(){
  if(this.i===1){
    this.deletepatient();
  }else{
    this.updatepatient();
  }
}



  public deletepatient(){

    this._patient.archivePatient(this.id).subscribe(
      res=>{
          this.router.navigate(['/admin/patients']);
      },
      err=>{
        
      }
    );

}


updatepatient(){
  this._patient.updatePatient(this.id ,  this.patient).subscribe(
  res=>{
  this.toastr.success('Patient mis à jour avec succès! ', 'succès!');
  
  },
  err=>{
    console.log(err);
    
  this.toastr.error('Erreur dans la modification du patient ', 'Erreur!');
  }
  );
  }



  

}