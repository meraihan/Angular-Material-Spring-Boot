import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private loginService: LoginService) { }

  ngOnInit(): void {
  
  }

  logout(){
    // this.tokenStorageService.signOut();
    this.router.navigate(['login']);
    this.tokenStorageService.signOut();
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token==undefined || token=='' || token==null){
      return false;
    } else {
      return true;
    }
  }


}
