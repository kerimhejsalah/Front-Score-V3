import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() { }

  //public url = "http://api.scores-app.fr/";
  public url = environment.apiUrl;


}
