import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from 'src/app/services/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  constructor(private http: HttpClient , public path: EndpointService) { }


  private url = this.path.url + 'dossier/';
  private urlAffectation = this.path.url + 'inside/';
  private urlForms = this.path.url + 'forms/';



  createNewdossier(dossier: any){
    /*    console.log("djkslm",dossier) */
    return this.http.post<any>(this.url  , dossier);


  }


  getAlldossier(){
    return this.http.get<any>(this.url);
  }


  getdossierFromArchive(){
    return this.http.get<any>(this.url + 'archive/getdossierfromarchive');
  }


  restorerdossier(id: any){

    return this.http.get<any>(this.url + 'restorer/' + id);

  }

  getdossierById(id: any){

    return this.http.get<any>(this.url + id);

  }
  getdossierByIdAff(id: any){
/* console.log(id) */
    return this.http.get<any>(this.url + 'getDossier/' + id);

  }
  deletedossier(id: any){

    return this.http.get<any>(this.url  + id);

  }

  updatedossier(id: any, dossier: any){
/* console.log(id,dossier) */
    return this.http.put<any>(this.url + id , dossier);

  }



  archivedossier(id: any){
/*      console.log(id)  */
    return this.http.get<any>(this.url + 'archived/' + id);
  }

  archivedossierSousDossier(id: any){
  
   return this.http.get<any>(this.url + 'archivedSousDossier/' + id._id );
 }


  affect(affectation: any){
/*     console.log(1,affectation)   */
    return this.http.post(this.urlAffectation + 'addinside' , affectation);

  }
  affectDossier(affectation: any){
/*      console.log(affectation)  */
      return this.http.post(this.urlAffectation + 'addinsideDossier' , affectation);
  
    }


  disaffect(dossier: any , form: any,type){
  /* console.log("dossier",dossier,type)  */
    return this.http.delete(this.urlAffectation + 'deleteinside/' +dossier + '/' + form + '/' + type );

  }


  getAllForm(){
    return this.http.get<any>(this.urlForms + 'getforms');
  }

  getMyForm(id: any){
console.log(this.urlAffectation + 'getmyform/' )
    return this.http.get<any>(this.urlAffectation + 'getmyform/' + id);

  }

  getdossierAffectaion(dossier: any){
    return this.http.get(this.urlAffectation + 'getinside/' + dossier);
  }


}
