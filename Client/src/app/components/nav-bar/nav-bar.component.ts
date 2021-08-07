import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/login.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() toggleSideBarForMe = new EventEmitter<any>();
  isShown = true ; // hidden by default
  email: string;
  name: string;
  surname: string;
  username: string;
  role: string;
  constructor(private router: Router, private tokenStorageService: TokenStorageService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('loggedUser');
    this.name = sessionStorage.getItem('loggedName');
    this.surname = sessionStorage.getItem('loggedSurname');
    this.email = sessionStorage.getItem('loggedEmail');
    this.role = sessionStorage.getItem('roles');
  }


  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    this.isShown = ! this.isShown;
  }

  logout() {
    // this.tokenStorageService.signOut();
    this.router.navigate(['login']);
    this.tokenStorageService.signOut();
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  isUser() {
    if (sessionStorage.getItem('roles').includes('ROLE_USER ')){
      return true;
    }
  }

  isAdmin() {
    if (sessionStorage.getItem('roles').includes('ROLE_ADMIN ')){
      return true;
    }
  }
}
