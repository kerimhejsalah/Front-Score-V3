import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EndpointService } from 'src/app/services/endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class FormsDataService {

  constructor(private http: HttpClient , public path: EndpointService) { }


  private url = this.path.url + 'forms/';
  private urlResponses = this.path.url + 'response/';

  private urlUser = this.path.url + 'user/';
  private urlAffectation = this.path.url + 'affectation/';





  createNewForm(form: any){
  // console.log("fff",form)  
    return this.http.post<any>(this.url + 'addforms' , form);


  }


  getAllForm(){
    return this.http.get<any>(this.url + 'getforms');
  }
  getAllFormAff(){
    return this.http.get<any>(this.url + 'getformsaffec');
  }
  getAllResponses(){
    return this.http.get<any>(this.urlResponses + 'getresponses');
  }

  getFormFromArchive(){
    return this.http.get<any>(this.url + 'getformsfromarchive');
  }


  restorerForm(id: any){

    return this.http.get<any>(this.url + 'restorer/' + id);

  }

  getFormById(id: any){

    return this.http.get<any>(this.url + 'getformsbyid/' + id);

  }

  deleteForms(id: any){

    return this.http.get<any>(this.url + 'delete/' + id);

  }

  updateForm(id: any, form: any){
   
    return this.http.put<any>(this.url + 'updateforms/' + id , form);

  }

  updatePassword(id: any, form: any){

    return this.http.put<any>(this.url + 'updatepassword/' + id , form);

  }

  newPassword(id: any, form: any){

    return this.http.put<any>(this.url + 'newpassword/' + id , form);

  }


  archiveForm(id: any){
    return this.http.get<any>(this.url + 'archived/' + id);
  }





  getAllDoctor(){

    return this.http.get<any>(this.urlUser + 'getuserbyrole/' + '2');
    
  }


  affect(affectation: any){
      /*  console.log("affectation",affectation) */
    return this.http.post(this.urlAffectation + 'addaffectation' , affectation);

  }



  getFormAffectaion(user: any){
    /* console.log("hhhhhio",user) */
    return this.http.get(this.urlAffectation + 'getformaffectation/' + user);
  }
  getFormAffectaionAll(){
    /* console.log("hhhhhio",user) */
    return this.http.get(this.urlAffectation + 'getaffectationall/' );
  }

  disaffect(user: any , form: any){
   /*  console.log("user,form",user,form) */
    return this.http.delete(this.urlAffectation + 'deleteaffectation/' +user + '/' + form );

  }

  uploadImage(image: any){
    return this.http.post(this.url + 'upload' , image);
  }


  deleteImage(image:any){
    return this.http.delete(this.path.url +'deletefile/' + image);
  }

  deleteManyImage(images: any){
    return this.http.post(this.url + 'deletemany' , images);
  }
}
