import { Injectable } from '@angular/core';
import { ApiServicesService } from './apiservices.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(public api: ApiServicesService) {



  }
  getAllUsers(): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('getAllUsers', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
  deleteUser(userId: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('deleteUser', {
        userId: userId,
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
  deleteComment(commentId: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('deleteComment', {
        commentId: commentId,
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
  deletePost(postId: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('deletePost', {
        postId: postId,
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
  countUserAndPosts(): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('countUserAndPosts', {
        token: localStorage.getItem("token"),
      }).then((res: any) => {
        console.log(res)
        return observer.next(res)
      })
    })
  }
}
