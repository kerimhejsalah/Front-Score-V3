import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrixService {

  constructor(private http: HttpClient,
    private _router: Router , private path: EndpointService) { }
    private _path =  this.path.url +  "prix/";
    private _pathan =  this.path.url +  "prix/an";
    getPrixForm(){
      return this.http.get(this._path );
    }
    addPrixForm(data){
      return this.http.post(this._path, data );
    }
    addPrixFormAn(data){
      return this.http.post(this._pathan, data );
    }
    getPrixForman(){
      return this.http.get(this._pathan );
    }
}
