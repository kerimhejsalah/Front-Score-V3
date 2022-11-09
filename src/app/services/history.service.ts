import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient,
    private _router: Router , private path: EndpointService) { }
    private _path =  this.path.url +  "achat/";
    getAllAchat(){
      return this.http.get(this._path );
    }
}
