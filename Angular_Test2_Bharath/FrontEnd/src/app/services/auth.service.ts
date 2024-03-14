import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  result: boolean = false;
  user: boolean = false;
  userData: any = [];
  constructor(public http: HttpClient) {}

  authService(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (
        localStorage.getItem('token') &&
        localStorage.getItem('token') !== null
      ) {
        this.http
          .post<any>(environment.url + 'userData', {
            token: localStorage.getItem('token'),
          })
          .subscribe(
            (data) => {
              if (data.status == 'true') {
                this.userData = data.data;

                this.result = true;
              }
              observer.next(this.result);
              observer.complete();
            },
            (error) => {
              console.error('Error during authentication:', error);
              observer.next(false);
              observer.complete();
            }
          );
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  userValidation(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (
        localStorage.getItem('token') &&
        localStorage.getItem('token') !== null
      ) {
        this.http
          .post<any>(environment.url + 'adminData', {
            token: localStorage.getItem('token'),
          })
          .subscribe(
            (data) => {
              if (data.status == 'true') {
                this.userData = data.data;

                this.user = true;
              }
              observer.next(this.user);
              observer.complete();
            },
            (error) => {
              console.error('Error during authentication:', error);
              observer.next(false);
              observer.complete();
            }
          );
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }
}
