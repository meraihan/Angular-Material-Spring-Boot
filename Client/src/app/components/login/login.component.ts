import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/services/login.service'

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

  constructor(private loginService: LoginService) { }

  ngOnInit(){
    if (this.loginService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(){
    console.log("form Submitted");
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)){
      console.log("We have to submit the form to server");
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log(response.token);
          this.loginService.loginUser(response.token);
          window.location.href="/dashboard";
        },
        error=>{
          console.log(error);
        }
      )
    } else {
      console.log("Fields are empty!");
    }
  }

}
