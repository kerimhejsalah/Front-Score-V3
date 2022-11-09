import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* import { EndpointService } from 'src/app/services/endpoint.service'; */
import { EndpointService } from 'src/app/services/endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class UrlvideoService {

  constructor(private http: HttpClient , public path: EndpointService) { }

  private urlV = this.path.url + 'urlVideo/';
  private urlVdAF = this.path.url + 'urlVideo/delete/';
/*   private urlForms = this.path.url + 'forms/';
  private urlAffectation = this.path.url + 'affectation/'; */

  createNewVideo(video :any){
  /*   console.log("video",video,"this.vvv",this.urlV) */
    return this.http.post<any>(this.urlV   , video );

  }
  getAllVideo(){
    return this.http.get<any>(this.urlV ); 
  }
  affectVideo(id:any,role:any){
/*     console.log(id,role) */
    return this.http.put<any>(this.urlV +id  , role );
  }
  deleteAffect(id:any,role:any){
     return this.http.put<any>(this.urlVdAF +id  ,role);
  }
  deleteVideo(id:any,role){
    return this.http.delete<any>(this.urlV +id  ,role); 
  }
}
