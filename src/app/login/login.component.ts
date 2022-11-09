import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {

    email: '',
    password: ''

  };
  particlesJS: any;
  emailAlert = false;
  passwordAlert = false;

  passwordType: string = "password";
  iconType: string = "visibility";
  passwordShow: boolean = false;
  user: any;
  alert = false;
  constructor(private _auth: AuthService, private snackBar: MatSnackBar,
    private _router: Router) { /* console.log(1,"constructor") */ }

  ngOnInit() {
    /* console.log(2,"ngOnInit") */
    if (this._auth.loggedIn) {
      this._router.navigate(['/admin']);
    }
    // this.particlesJS.load('particles-js', '../assets/particles.json', null);
  }


  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    if (!sEmail.match(reEmail)) {

      return false;
    }

    return true;

  }

  changetab() {
    /*  console.log("kdkdk",this.passwordType) */
  }
  public togglePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = "password";
      this.iconType = "visibility";
    } else {
      this.passwordShow = true;
      this.passwordType = "text";
      this.iconType = "visibility_off";
    }
  }
  loginUser() {

    this.emailAlert = false;
    this.passwordAlert = false;
    /* console.log(1); */
    if (this.validateEmail(this.loginUserData.email) && this.loginUserData.password.length > 0) {
      /* console.log(2,this.loginUserData.email); */
      this._auth.loginUser(this.loginUserData)
        .subscribe(
          res => {
            /*     console.log(3,res);  */
            localStorage.setItem('token', res.token);

            this._router.navigate(['/admin']);
          },
          err => {

            //   this.snackBar.open('Login Successful','',{duration:1000})
            this.snackBar.open(" Email ou mot de passe incorrect !", "×", {
              duration: 2000,
              // here specify the position
              verticalPosition: 'top'
            });
            /*   console.log(55555); */
            setTimeout(
              () => {
                this.alert = false
              }, 4000
            );


          }
        )

    } else {
      //   this.snackBar.open('Login Successful','',{duration:1000})
      this.snackBar.open(" Email ou mot de passe incorrect !", "×", {
        duration: 2000,
        // here specify the position
        verticalPosition: 'top'
      });
      /*     console.log(55555); */
      setTimeout(
        () => {
          this.alert = false
        }, 4000
      );
    }


    if (!this.validateEmail(this.loginUserData.email)) {

      this.emailAlert = true

    }

    if (this.loginUserData.password.length === 0) {

      this.passwordAlert = true

    }


  }

}
