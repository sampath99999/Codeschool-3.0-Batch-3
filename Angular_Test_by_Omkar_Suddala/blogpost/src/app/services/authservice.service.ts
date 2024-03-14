import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  ret: boolean = false;
  constructor(private http: HttpClient) {


  }
  returnAdmin: boolean = false;
  userData: any = [];
  adminData: any = [];

  authService(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
        this.http.post<any>(environment.apiUrl + 'userData', {
          token: localStorage.getItem("token")
        }).subscribe((data) => {
          if (data.status == "true") {
            this.userData = data.data;
            // console.log(this.userData);
            this.ret = true;
          }
          observer.next(this.ret);
          observer.complete();
        }, (error) => {
          console.error("Error during authentication:", error);
          observer.next(false);
          observer.complete();
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }
  adminValidation(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
        this.http.post<any>(environment.apiUrl + 'adminData', {
          token: localStorage.getItem("token")
        }).subscribe((data) => {
          if (data.status == "true") {
            this.adminData = data.data;
            // console.log(this.userData);
            this.returnAdmin = true;
          }
          observer.next(this.returnAdmin);
          observer.complete();
        }, (error) => {
          console.error("Error during authentication:", error);
          observer.next(false);
          observer.complete();
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

}