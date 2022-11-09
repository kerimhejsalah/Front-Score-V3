import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }
  response: any;
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      if(this._authService.getUserData()){
 
           return true
      
         
      }
     
    } else {
      this._router.navigate(['/login']);
      return false
    }
  }
  
}
