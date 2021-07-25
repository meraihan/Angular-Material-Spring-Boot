import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  credentials={
    username: '',
    password: '',
    email: ''
  }


  constructor(private registerService: RegistrationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("form Submitted");
    this.registerService.register(this.credentials).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
