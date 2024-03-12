import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }


  signIn(email: any, password: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      "http://localhost:5400/login",
      {
        email: email,
        password: password,
      },
      {headers}
    );
  }

  getUser(): Observable<any> {
    let token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5400/getUser',
      {token: token}, {headers}
    );
  }

  logout(): Observable<any> {
    let token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5400/logout',
      {token: token}, {headers}
    );
  }

}
