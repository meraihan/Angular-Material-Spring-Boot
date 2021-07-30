import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  id: number;

  constructor(private token: TokenStorageService, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.id = this.currentUser.id;
  }


  onSubmit(){
    this.registrationService.updateUser(this.id, this.currentUser).subscribe( data =>{
      this.router.navigate(['message']);
    }
    , error => console.log(error));
  }

}
