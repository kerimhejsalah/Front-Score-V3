import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }
  response: any;
  error: any;
  toReturn = false;
 async  canActivate  ()  {

    
const res = await this._authService.tokenVerification().toPromise().then(res=>{this.response = res}, err=>{this.error = err});
/* console.log('hiiii',this.response) */


if(this.response){
  if (this.response.status === 200){
  
    this.toReturn = true;
    
  }else{  
 /*    console.log(1) */
    this._router.navigate(['/login']);
    this.toReturn = false
  }
}else{  
/*   console.log(2) */
  this._router.navigate(['/login']);
  this.toReturn = false
}



  


return this.toReturn;
 
  
}

}
