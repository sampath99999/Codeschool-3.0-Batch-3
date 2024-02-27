import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  userData: any = [];
  ret: boolean = false;

  authService(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
    });
    return new Observable<boolean>((observer) => {
      if (
        localStorage.getItem('token') &&
        localStorage.getItem('token') !== null
      ) {
        this.http
          .post<any>(
            environment.apiUrl + 'userdata.php',
            {
              token: localStorage.getItem('token'),
            },
            { headers }
          )
          .subscribe(
            (data) => {
              if (data.status == true) {
                this.userData = data.data;
                console.log(this.userData);
                this.ret = true;
              }
              observer.next(this.ret);
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
