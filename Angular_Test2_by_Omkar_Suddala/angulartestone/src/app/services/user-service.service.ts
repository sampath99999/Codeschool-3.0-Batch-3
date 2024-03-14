import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public apiService: RestApiService) { }
  getUserTask(): Observable<{ status: boolean, message: string, data?: any }> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.apiService.postData('getUserTask', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res)
      })
    })
  }
  taskStatusUpdate(taskId: number, status: string): Observable<any> {
    let data = {
      "token": localStorage.getItem("token"),
      "taskId": taskId,
      "status": status
    };
    return new Observable<any>((observer) => {
      this.apiService.postData('taskStatusUpdate', data).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
}
