import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EndpointService } from 'src/app/services/endpoint.service';
import { UploadimageService } from 'src/app/services/uploadimage.service';
import { DoctorDataService } from '../doctor/services/doctor-data.service';
import { DataPatientService } from '../patient/services/data-patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;

  constructor(private route: ActivatedRoute, 
    private modalService: NgbModal,
    private auth: AuthService,
    private _iploadImg: UploadimageService,
    private _doctor: DoctorDataService,
    public path: EndpointService) { }

id: any;
admin: any;
showSpinner = false;
updateToggle = false;
user = false;
updateTogglePhoto = false;

open(i: any) {
const modalRef = this.modalService.open(NgbdModalContent);
modalRef.componentInstance.id = this.id ;
modalRef.componentInstance.i = i ;
modalRef.componentInstance.admin = this.admin ;




}









    ngOnInit(): void {
    this.id =  this.auth.getUserData()._id;

    this.showSpinner = true;

    this.auth.getAdminById(this.id).subscribe(
      res=>{
     /* console.log("adddd",res)  */
        this.admin = res;
        if(res){
          this.user=true
        }
      },err=>{

        
      }
    );
    this.showSpinner= false;

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
  /*   console.log('hhh', this.imageUrl); */
    this._iploadImg.uploadImage(this.imageUrl).subscribe((result)=>{
      
      this.url =result
      this.admin.photo= result
/*      console.log("this.url", this.url) 
     console.log("this.admin.photo", this.admin.photo)  */
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
  
/*   console.log("fill",file)
  console.log("imageBlob",imageBlob) */

  this.auth.updateAdminPhoto( this.admin._id , file).subscribe(

    res=>{


      this.url = null;
      this.showSpinnerUpdatePhoto = false;

      this.ngOnInit();
         location.reload()
     
    }, 
    err=>{
     
      
  
      
    }
    
  );


}


updatePassword(){

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
  @Input() admin;
  @Input() i;




  constructor(public activeModal: NgbActiveModal,private _auth: AuthService,
    private toastr: ToastrService,
    private router : Router, 

    ) {}


action(){

    this.updateadmin();
  
}






updateadmin(){
  this._auth.updateAccount(this.id ,  this.admin).subscribe(
  res=>{
  this.toastr.success('Patient mis à jour avec succès! ', 'succès!');
    
  },
  err=>{
  
    
  this.toastr.error('Erreur dans la modification du compte ', 'Erreur!');
  }
  );
  }


}