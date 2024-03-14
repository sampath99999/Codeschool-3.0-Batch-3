import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(public apiService: RestApiService) { }
  getAllUsers(): Observable<{ status: boolean, message: string, data?: any }> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.apiService.postData('getAllUsers', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res)
      })
    })
  }
  getAllTasks(): Observable<{ status: boolean, message: string, data?: any }> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.apiService.postData('getAllTasks', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res)
      })
    })
  }

  countOfTasks(): Observable<{ status: boolean, message: string, data?: any }> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.apiService.postData('countOfTasks', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res)
      })
    })
  }

}
