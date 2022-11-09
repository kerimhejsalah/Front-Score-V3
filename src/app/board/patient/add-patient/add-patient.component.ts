import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataPatientService } from '../services/data-patient.service';
import { UploadimageService } from 'src/app/services/uploadimage.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    private _patient: DataPatientService,
    private toastr: ToastrService,
    private _iploadImg: UploadimageService,
    private router: Router) { }

  showSpinner = false;


  testName = false;
  testLastName = false;
  testEmail = false;
  testPassword = false;
  testAdresse = false;
  testGender = false;
  testBirthday = false;
  testTelephone = false;
  testSsn = false;
  






  url :any;
  patient = {

    name: '',
    lastname: '',
    email: '',
    birthday: '',
    ssn: '',
    adresse: '',
    tel: '',
    password: '',
    added_date: '',
    gender: '',
    account_state: false,
    archived: false,
    photo:''


  }
  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
     /*  console.log('hhh', this.imageUrl); */
      this._iploadImg.uploadImage(this.imageUrl).subscribe((result)=>{
        
        this.url =result
    /*     console.log("reee", result) */
      })
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  ngOnInit(): void {
  }


  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    if (!sEmail.match(reEmail)) {

      return false;
    }

    return true;

  }


  createNewPatient() {



    this.testName = false;
    this.testLastName = false;
    this.testEmail = false;
    this.testPassword = false;
    this.testAdresse = false;
    this.testGender = false;
    this.testBirthday = false;
    this.testTelephone = false;
    this.testSsn = false;



    let countError = 0;

    if (this.patient.name.length == 0) {
      this.testName = true;
      countError++;
    }

    if (this.patient.lastname.length == 0) {
      this.testLastName = true;
      countError++;
    }


    if (!this.validateEmail(this.patient.email)) {
      this.testEmail = true;
      countError++;
    }


    if (this.patient.password.length < 6) {
      this.testPassword = true;
      countError++;
    }


    if (this.patient.adresse.length == 0) {
      this.testAdresse = true;
      countError++;
    }


    if (this.patient.gender.length == 0) {
      this.testGender = true;
      countError++;
    }



    if (this.patient.birthday.length == 0) {
      this.testBirthday = true;
      countError++;
    }


    if (this.patient.tel.length == 0) {
      this.testTelephone = true;
      countError++;
    }



    // if (this.patient.ssn.length == 0) {
    //   this.testSsn = true;
    //   countError++;
    // }


 


    if (countError === 0) {
   
      const imageBlob = this.url;
      this.patient.photo=this.url
      const file = new FormData();
      file.set('photo', this.patient.photo);
      file.set('name', this.patient.name);
      
      file.set('lastname', this.patient.lastname);
      file.set('email', this.patient.email);
      file.set('birthday', this.patient.birthday);
      file.set('adresse', this.patient.adresse);
      file.set('tel', this.patient.tel);
      file.set('password', this.patient.password);
      file.set('gender', this.patient.gender);
      file.set('ssn', this.patient.ssn);



      this.showSpinner = true;
     /*  console.log("imageBlob",file) */
      this._patient.createNewUser(file).subscribe(
        res => {

          this.patient = {

            name: '',
            lastname: '',
            email: '',
            photo:'',
            birthday: '',
            ssn: '',
            adresse: '',
            tel: '',
            password: '',
            gender: '',
            added_date: '',
            account_state: false,
            archived: false,


          };
          this.showSpinner = false;
          this.toastr.success('Patient créé avec succès! ', 'succès!');
          this.router.navigateByUrl('/admin/patients')

        },
        err => {
          this.showSpinner = false;


          this.toastr.error('Erreur dans la création du patient ', 'Erreur!');
        }
      );
    }



  }




  onAdd(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
     /*    this.url = event.target.result; */


      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
