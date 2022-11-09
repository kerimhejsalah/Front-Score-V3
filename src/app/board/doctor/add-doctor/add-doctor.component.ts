import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorDataService } from '../services/doctor-data.service';
import { UploadimageService} from 'src/app/services/uploadimage.service';
/* import uploadcare from 'uploadcare-widget' */
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
   /* widget = uploadcare("#uploader", { publicKey: '78438663440617fc29f2' }); */
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(
    private _doctor: DoctorDataService,
    private toastr: ToastrService,
    private _iploadImg: UploadimageService,
    private router: Router) { }

  url : any;
  doctor = {

    name: '',
    lastname: '',
    email: '',

    birthday: '',
    photo:'',
    adresse: '',
    tel: '',
    password: '',
    added_date: '',
    account_state: false,
    archived: false,
    gender: '',
    job: '',
    fax: '',
    account_state_dossier_affectation:false,
    rpps: 0,
    adeli: 0,
    role: 2


  }


  testName = false;
  testLastName = false;
  testEmail = false;
  testPassword = false;
  testAdresse = false;
  testGender = false;
  testBirthday = false;
  testTelephone = false;
  testAdeli = false;
  testRpps = false;
  testJob = false;
  testFax = false;

  ngOnInit(): void {
  }

  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    if (!sEmail.match(reEmail)) {

      return false;
    }

    return true;

  }

  showSpinner = false;

  createNewDoctor() {

    this.testName = false;
    this.testLastName = false;
    this.testEmail = false;
    this.testPassword = false;
    this.testAdresse = false;
    this.testGender = false;
    this.testBirthday = false;
    this.testTelephone = false;
    this.testAdeli = false;
    this.testRpps = false;
    this.testJob = false;
    this.testFax = false;

    let countError = 0;

    if (this.doctor.name.length == 0) {
      this.testName = true;
      countError++;
    }

    if (this.doctor.lastname.length == 0) {
      this.testLastName = true;
      countError++;
    }


    if (!this.validateEmail(this.doctor.email)) {
      this.testEmail = true;
      countError++;
    }


    if (this.doctor.password.length < 6) {
      this.testPassword = true;
      countError++;
    }


    if (this.doctor.adresse.length == 0) {
      this.testAdresse = true;
      countError++;
    }


    if (this.doctor.gender.length == 0) {
      this.testGender = true;
      countError++;
    }



    if (this.doctor.birthday.length == 0) {
      this.testBirthday = true;
      countError++;
    }


    if (this.doctor.tel.length == 0) {
      this.testTelephone = true;
      countError++;
    }


    if (this.doctor.adeli.toString().length < 9 || this.doctor.adeli.toString().length > 9) {
      this.testAdeli = true;
      countError++;
    }

    if (this.doctor.rpps.toString().length < 11 || this.doctor.rpps.toString().length > 11) {
      this.testRpps = true;
      countError++;
    }

    if (this.doctor.job.length == 0) {
      this.testJob = true;
      countError++;
    }

    if (this.doctor.fax.length == 0) {
      this.testFax = true;
      countError++;
    }

    if (countError === 0) {
      this.doctor.photo=this.url
      const imageBlob = this.fileInput.nativeElement.files[0];
      const file = new FormData();
      file.set('photo', this.doctor.photo);
      file.set('name', this.doctor.name);
      file.set('lastname', this.doctor.lastname);
      file.set('email', this.doctor.email);
      file.set('birthday', this.doctor.birthday);
      file.set('adresse', this.doctor.adresse);
      file.set('tel', this.doctor.tel);
      file.set('password', this.doctor.password);
      file.set('added_date', this.doctor.added_date);
      file.set('job', this.doctor.job);
      file.set('fax', this.doctor.fax);
      file.set('gender', this.doctor.gender);
      file.set('adeli', this.doctor.adeli.toString());
      file.set('rpps', this.doctor.rpps.toString());

      file.set('role', this.doctor.role.toString())
      this.showSpinner = true;

      this._doctor.createNewDoctor(file).subscribe(
        res => {
        /*   console.log(res) */
          this.doctor = {

            name: '',
            lastname: '',
            email: '',
            photo:'',
            birthday: '',
            adresse: '',
            tel: '',
            password: '',
            added_date: '',
            account_state: false,
            archived: false,
            gender: '',
            job: '',
            fax: '',
            account_state_dossier_affectation:false,
            rpps: 0,
            adeli: 0,
            role: 3


          };

          this.toastr.success('Docteur créé avec succès! ', 'succès!');
          this.showSpinner = false;
          this.router.navigateByUrl('/admin/doctors')
        },
        err => {
       /*    console.log(err) */
          this.showSpinner = false;
          this.toastr.error('Erreur dans la creation du docteur! ', 'Erreur!');
        }
      );

    }

  }



  onAdd(event: any) {

const formData = new FormData();
const file:File = event.target.files[0];
            formData.append("thumbnail", file);
       /*      setTimeout(() => {
              console.log("formData",formData)
            }, 2000); */
          
/* this._iploadImg.uploadImage(file).subscribe((result)=>{
  console.log("reee",result)
}) */
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;

        
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }





  title = 'fileUpload';
  images;
  multipleImages = [];

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(){
 
    const formData = new FormData();
  /*   console.log("this.formData 1",formData) */
    formData.append('file', this.images);
/*     this.widget.uploadFile(this.images).subscribe((res)=>{
 
     console.log(res)
  
    }) */
   /*  console.log("this.formData 2",formData) */
 
/*     this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    ); */
  }



  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      /* console.log('hhh', this.imageUrl); */
      this._iploadImg.uploadImage(this.imageUrl).subscribe((result)=>{
        
        this.url =result
    /*     console.log("reee", result) */
      })
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  
}
