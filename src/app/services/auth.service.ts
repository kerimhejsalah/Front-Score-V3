import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private http: HttpClient,
    private _router: Router , private path: EndpointService) { }

private _path =  this.path.url +  "admin/";
private _pathDoctor =  this.path.url +  "doctor/";
private _pathPatient =  this.path.url +  "patient/";






private _loginUrl = this._path +"login";



loginUser(user) {
/*   console.log(this._loginUrl)  */
return this.http.post<any>(this._loginUrl, user);
}

logoutUser() {
localStorage.removeItem('token');
this._router.navigate(['/login']);
}

getToken() {
/*   console.log(localStorage.getItem('token'))  */
return localStorage.getItem('token');
}

loggedIn() {
return !!localStorage.getItem('token');
}



jwtDecode(t) {
 if(t){
  let token = {
    raw:'',
    header:'',
    payload: ''
  };

  let payload : any;
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  payload = JSON.parse(window.atob(t.split('.')[1]));
  return (payload)
 }else return null
}


getUserData(){
    let token = this.getToken();
  
    var decoded = this.jwtDecode(token); 
    
    if (decoded) {
      return decoded.subject; 
    } else return null
}


checkLink(id, token){

 return this.http.get(this._path + 'reset-password/' + id + '/' + token);

}

checkLinkDoctor(id, token){

  return this.http.get(this._pathDoctor + 'reset-password/' + id + '/' + token);
 
 }

 checkLinkPatient(id, token){

  return this.http.get(this._pathPatient + 'reset-password/' + id + '/' + token);
 
 }

forgotPassword(email){
/*  console.log("email",email) */
  return this.http.post(this._path + 'forgot-password' , email);

}

resetPassword(id, token , password){

  return this.http.post(this._path + 'reset-password/' + id + '/' + token , password);

}


resetPasswordDoctor(id, token , password){

  return this.http.post(this._pathDoctor + 'reset-password/' + id + '/' + token , password);

}


resetPasswordPatient(id, token , password){

  return this.http.post(this._pathDoctor + 'reset-password/' + id + '/' + token , password);

}




updateAccount(id: any , admin: any){

  return this.http.put<any>(this.path.url +'admin/'+ id , admin);

}

getAdminById(id:any){
  return this.http.get(this._path + id);
}

updateAdminPhoto(id:any, photo:any) : Observable<any>{
  return this.http.put(this._path + 'updatephoto/' +id , photo);
}




/* tokenVerification(){
console.log("authhgard",this.getToken())
  return this.http.post(environment.apiUrl + 'admin/tokenverification',{token: this.getToken()});


} */
tokenVerification() {
  return this.http.post(environment.apiUrl + 'admin/tokenverification', {
    token: this.getToken(),
  });
}





}
