import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  logIn(email:string,password:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/login',
      {
        email:email,
        password:password
      },
      {headers}
    );
  }

  register(fullName:string,email:string,password:string,dateOfBirth:string,gender:string,address:string,city:string,state:string,pinCode:string,mobile:string,dateOfRegistrationOfUser:Date): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/register',
      {
        fullName:fullName,
        email:email,
        password:password,
        dateOfBirth:dateOfBirth,
        gender:gender,
        address:address,
        city:city,
        state:state,
        pinCode:pinCode,
        mobileNumber:mobile,
        registrationDate:dateOfRegistrationOfUser
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
      environment.api+'/getUser',
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


  getUserProfileDetail(): Observable<any>{
    let token:string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/userProfile',
      {token: token,

      }, {headers}
    );

  }


  updateUserData(address:string,city:string,state:string,pinCode:string,mobileNumber:string): Observable<any>{
    let token:string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/updateUserProfile',
      {token: token,
        address:address,
        city:city,
        state:state,
        pinCode:pinCode,
        mobileNumber:mobileNumber

      }, {headers}
    );

  }


}
