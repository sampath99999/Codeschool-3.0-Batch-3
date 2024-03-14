import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userValidation: [] = [];
  userType: string = '';


  constructor(private http: HttpClient) { }
  isFieldInvalid(field: string, data: any, isFormSubmitted: boolean) {
    return data.get(field)?.invalid && (data.get(field)?.touched || data.get(field)?.dirty || isFormSubmitted)
  }


  getErrorMessage(data: any, field: string, label: string) {
    if (data.get(field)?.hasError("required")) return `${label} is required`;
    if (data.get(field)?.hasError("minlength")) return `${label} should be at least ${data.get(field)?.getError("minlength").requiredLength} characters`;
    if (data.get(field)?.hasError("maxlength")) return `${label} should be at most ${data.get(field)?.getError("maxlength").requiredLength} characters`;
    if (data.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }

  authService(): Observable<any> {
    return new Observable<any>((observer) => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== null) {
        this.http.post<any>(environment.BASE_URL + 'userData', {
          token: localStorage.getItem("token")
        }).subscribe((data) => {
          if (data.status) {

            this.userValidation = data;
          }
          observer.next(this.userValidation);
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
