import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from 'src/app/services/login.service'
import {TokenStorageService} from 'src/app/services/token-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials={
    username: '',
    password: ''
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private loginService: LoginService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(){
    if (this.loginService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;    
    }
  }

  onSubmit(){
    console.log("form Submitted");
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)){
      console.log("We have to submit the form to server");
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          this.tokenStorage.saveToken(response.token);
          this.tokenStorage.saveUser(response);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
          sessionStorage.setItem('loggedUser', response.username);
          console.log(response.token);
          this.loginService.loginUser(response.token);
          window.location.href="/dashboard";
        },
        error=>{
          console.log(error);
          this.errorMessage = error.message;
          this.isLoginFailed = true;
        }
      )
    } else {
      console.log("Fields are empty!");
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
