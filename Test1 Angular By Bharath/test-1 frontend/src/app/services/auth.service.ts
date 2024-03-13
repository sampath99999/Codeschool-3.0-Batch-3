import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ret: boolean = false;
  constructor(private http: HttpClient) {


  }
  returnAdmin: boolean = false;
  userData: any = [];
  adminData: any = [];

  authService(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
        this.http.post<any>(environment.url + 'userData', {
          token: localStorage.getItem("token")
        }).subscribe((data) => {
          if (data.status == "true") {
            this.userData = data.data;
         
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
        this.http.post<any>(environment.url + 'adminData', {
          token: localStorage.getItem("token")
        }).subscribe((data) => {
          if (data.status == "true") {
            this.adminData = data.data;
           
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
