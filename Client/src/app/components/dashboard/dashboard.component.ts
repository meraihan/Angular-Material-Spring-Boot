import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
  logout(){
    // this.tokenStorageService.signOut();
    this.router.navigate(['login']);
    this.tokenStorageService.signOut();
  }
}
