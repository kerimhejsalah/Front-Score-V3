import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadimageService {
  constructor(private http: HttpClient,
    private _router: Router , private path: EndpointService) { }
  private _uploadImage =  this.path.url +  "uploadApi/";


  uploadImage(image){
  /*   console.log("iiii",image) */
    return this.http.post(this._uploadImage, {image :image} );
  }
}
