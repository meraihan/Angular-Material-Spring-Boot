import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API1 = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    const parsedUrl= new URL(window.location.href);
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      baseFrontURL: parsedUrl.origin
    }, httpOptions);
  }

  updateUser(id: number, user): Observable<any>{
    console.log(id);
    return this.http.put(`${AUTH_API1}`+'users' +`/${id}`, user);
  }
}
