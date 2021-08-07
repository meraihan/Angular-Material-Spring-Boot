import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../../services/registration.service';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  loading = false;

  credentials = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: ''
  };


  constructor(private registerService: RegistrationService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    console.log('form Submitted');
    this.registerService.register(this.credentials).subscribe(
      data => {
        console.log(data.message);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loading = false;
        this.router.navigate(['reg-success']);
        this.toastr.success(data.message, 'Success');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toastr.error(err.error.message, 'Error, Please try again');
        this.loading = false;
      }
    );
  }

}
