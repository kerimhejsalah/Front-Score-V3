import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DossierService } from '../services/dossier.service';
import { DoctorDataService } from '../../doctor/services/doctor-data.service';
@Component({
  selector: 'app-add-dossier',
  templateUrl: './add-dossier.component.html',
  styleUrls: ['./add-dossier.component.css']
})
export class AddDossierComponent implements OnInit {


  constructor(
    private _dossier: DossierService,
    private toastr: ToastrService,
    private router: Router,
    private _docor: DoctorDataService) { }

  showSpinner = false;


  testName = false;


  dossier = {

    name: '',

    added_date: '',

    archived: false,
    status:false,
    idDossier:'sddddddddddddddgsth25'


  }
  allDosssier=[];

  ngOnInit(): void {
    this._dossier.getAlldossier().subscribe(
      res=>{
       let i=0
     res.map((result)=>{
      if(result.status)
      i=i+1 
      else
      this.allDosssier.push(result)
    })
 /*    console.log(this.allDosssier)  */
      },
      err=>{
     
        
      }
    );
  }



  createNewdossier() {



    this.testName = false;


    let countError = 0;

    if (this.dossier.name.length == 0) {
      this.testName = true;
      countError++;
    }


 


    if (countError === 0) {
   



      this.showSpinner = true;
       console.log(this.dossier)  
      this._dossier.createNewdossier(this.dossier).subscribe(
        res => {
          console.log(res)  
          if(!res){
            this.showSpinner = false;
            this.toastr.warning('Erreur dans la création du dossier ', 'Erreur!');
          }else{
          this.dossier = {

            name: '',
           
            added_date: '',
          
            archived: false,
            status:false,
            idDossier:''


          };
          this.showSpinner = false;
          this.toastr.success('dossier créé avec succès! ', 'succès!');
          this.router.navigateByUrl('/admin/dossier')
      /*     this._docor.getAllDoctor().subscribe(
            ress=>{
       
        ress.map((result)=>{
          result.liste_dossier.push({
                checkedone: false,
                dataForms: [],
                id: res._id,
                lengthTab: 0,
                status: false,
                valLenght: false,
          })
        })
            },
            err=>{
              
            }
          ); */
          this._docor.getAllDoctor().subscribe(
            ress=>{
           ress.map((result)=>{
          /*    console.log(result) */
             result.liste_dossier.push({
              checkedone: false,
              dataForms: [],
              id: res._id,
              lengthTab: 0,
              status: false,
              valLenght: false,
        })
      /*   console.log(result)  */
        this._docor.updateDoctor(result._id ,  result,result.liste_dossier,"autre").subscribe(
          res=>{
          
          },
          err=>{
          }
          );
           })
            },
            err=>{
              
            }
          );}
        },
        err => {
          this.showSpinner = false;

          this.toastr.error('Erreur dans la création du dossier ', 'Erreur!');
        }
      );
    }



  }




}
