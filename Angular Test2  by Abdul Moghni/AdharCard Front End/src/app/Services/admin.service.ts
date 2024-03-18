import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
userEmail:string="";
  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getAdminTableDetail(): Observable<any> {
    let token: string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/adminTableDetail',
      {token: token}, {headers}
    );
  }

  deleteUser(emailOfUser:string): Observable<any>{
    let token:string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/deleteUser',
      {token: token,
        email:emailOfUser,
      }, {headers}
    );
  }

  getUserProfileDetail(): Observable<any>{
    let emailOfUser=this.userEmail;
    let token:string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/selectedUserProfile',
      {token: token,
        email:emailOfUser,
      }, {headers}
    );

  }

  setUserEmail(email:string){
    this.userEmail=email;
  }

  updateUserData(address:string,city:string,state:string,pinCode:string,mobileNumber:string): Observable<any>{
    let token:string =<string> localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      environment.api+'/updateUserProfile',
      {token: token,
        email:this.userEmail,
        address:address,
        city:city,
        state:state,
        pinCode:pinCode,
        mobileNumber:mobileNumber

      }, {headers}
    );

  }






}
