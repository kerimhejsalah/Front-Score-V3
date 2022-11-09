import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  id: any;
 token: any;
 passwordType:string ="password";
 iconType:string = "visibility";
 passwordShow:boolean = false;
  constructor(private route: Router ,private router: ActivatedRoute , private auth: AuthService,private snackBar:MatSnackBar,){
   
  }
 

  loginUserData = {

 
    password: '',
    confirm: ''

  };

  passwordAlert = false;

  ngOnInit(): void {

    this.id = this.router.snapshot.paramMap.get('id');
    this.token = this.router.snapshot.paramMap.get('token');
   
    
    let toreturn : any;
    this.auth.checkLink(this.id, this.token).subscribe(
      res=>{
        toreturn = true;
      },
      err=>{
        toreturn = false;
        this.route.navigate(['/forgotpassword']);
      }
    );
  }

  success = false;
  public togglePassword(){
    if(this.passwordShow){
      this.passwordShow = false;
      this.passwordType = "password";
      this.iconType="visibility";
    }else{
     this.passwordShow = true  ;
     this.passwordType = "text";
     this.iconType="visibility_off";
    }
 }
  reset(){
    if(this.loginUserData.password !== this.loginUserData.confirm){

      this.passwordAlert = true;

    }else{
      this.passwordAlert = false;
      this.auth.resetPassword(this.id, this.token , this.loginUserData).subscribe(
        res=>{
          this.success = true;
          this.snackBar.open(" Mot de passe est Modifier" ,"×", {
            duration: 2000,
            // here specify the position
            verticalPosition: 'top'
          });
          setTimeout(()=>{
           
            this.route.navigate(['/login']);
          } , 2000);
        },
        err=>{
          this.success = true;
          setTimeout(()=>{
            this.route.navigate(['/login']);
          } , 2000);
          
        }
      )

    }

  }

}
