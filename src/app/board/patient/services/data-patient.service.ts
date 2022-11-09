import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class DataPatientService {

  
  constructor(private http: HttpClient , public path: EndpointService) { }

  private urlPatient = this.path.url + 'patient/';
  private urlForms = this.path.url + 'forms/';
  private urlAffectation = this.path.url + 'affectation/';


  createNewUser(user: any){

    return this.http.post<any>(this.urlPatient   ,  user);

  }


  
  lockunlock(user: any, lock: any){

    return this.http.put(this.urlPatient + 'lockunlock/' + user , lock);

  }


  getAllPatient(){

    return this.http.get<any>(this.urlPatient );
    
  }


  getAllPatientPaginator( s: any ){

    return this.http.get<any>(this.urlPatient + s );
    
  }


  
  getNumberOfPatient( ){

    return this.http.get<any>(this.urlPatient + 'stat' );
    
  }

  getPatientFromArchive(){

    return this.http.get<any>(this.urlPatient + 'archive/getpatientfromarchive');
    
  }


  getPatientById(id: any){

    return this.http.get<any>(this.urlPatient  + id);

  }

  archivePatient(id: any){
    return this.http.get<any>(this.urlPatient + 'archived/' + id);
  }



  updatePatient(id: any , doctor: any){
/* console.log(this.urlPatient,id , doctor) */
    return this.http.put<any>(this.urlPatient  + id , doctor);

  }




  getAllForm(){
    return this.http.get<any>(this.urlForms + 'getforms');
  }


  
  affect(affectation: any){

    return this.http.post(this.urlAffectation + 'addaffectation' , affectation);

  }


  updatePatientPhoto(id:any, photo:any){
    return this.http.put(this.urlPatient + 'updatephoto/' +id , photo);
  }

}
