import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewPostService {
  viewPost: any = [];
  postId: number = 0;
  constructor(private http: HttpClient) {

    //   let post = Subject<any>({
    //     return new Subject((data: any) => {

    //     })
    //   });
  }

  viewPostService(postId: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post<any>(environment.apiUrl + 'viewPost', {
        token: localStorage.getItem("token"),
        postId: postId
      }).subscribe((data) => {
        if (data.status == "true") {
          this.postId = postId;
          this.viewPost = data.data.viewPost;
          console.log(this.viewPost);
        }
        observer.complete();
      }, (error) => {
        console.error("Error during authentication:", error);
        observer.next(false);
        observer.complete();
      });
      observer.next(false);
      observer.complete();
    });
  }
  viewPostsComments(postId: number): Observable<boolean> {
    return new Observable<any>((observer) => {
      this.http.post<any>(environment.apiUrl + 'postComments', {
        token: localStorage.getItem("token"),
        postId: postId
      }).subscribe((response
      ) => {
        return observer.next(response.data.postComments);
      }, (error) => {
        return observer.error(error.message);
      })
    })
  }
  getAllPost(): Observable<boolean> {
    return new Observable<any>((observer) => {
      this.http.post<any>(environment.apiUrl + 'getAllPost', {
        token: localStorage.getItem("token"),
      }).subscribe((response
      ) => {
        return observer.next(response.data);
      }, (error) => {
        return observer.error(error.message);
      })
    })
  }

}
