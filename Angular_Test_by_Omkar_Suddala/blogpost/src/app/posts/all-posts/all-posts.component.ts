import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/authservice.service';
import { environment } from '../../../environments/environment';
import { ApiServicesService } from '../../services/apiservices.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FormsModule, CommonModule],

  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})
export class AllPostsComponent {
  allPosts: any = [];
  postLike: any = [];
  totalLikes: number = 0;
  postImagePath: string = '/assets/images/';
  commentText: string = '';
  comments: any = [];
  commentButtonClass = 'd-none';
  commentStatus = false;
  public postId: number = 1;
  loaderStatus: boolean = true;
  constructor(private auth: AuthServiceService, private router: Router, private http: ApiServicesService, private changeDetector: ChangeDetectorRef) {

    this.auth.authService().subscribe((result) => {
      if (!result) {

        this.router.navigate(['signIn'])
      } else {
        this.getAllComments();

      }
    });

  }

  allPost() {
    this.http.postData('allPost', { token: localStorage.getItem('token') }).then((res: any) => {
      this.allPosts = res.data.post;
      this.postLikes();
      this.loaderStatus = false;

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the  Post List',
        showConfirmButton: false,
      })
    })
  }
  viewPost(postId: number) {
    this.router.navigate(['posts/viewPost', postId]);
  }
  postLikes() {
    this.http.postData('postLikes', {
      token: localStorage.getItem('token'),

    }).then((res: any) => {
      this.postLike = res.data.likes;

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the  Post likes',
        showConfirmButton: false,
      })
    })
  }

  likeCount(userId: number, postId: number) {

    this.http.postData('likeCount', {
      token: localStorage.getItem('token'),
      postId: postId,
      userId: userId
    }).then((res: any) => {
      this.likes(postId);
      this.allPost();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the  like post',
        showConfirmButton: false,
      })
    })
  }
  unLikeCount(likeId: number, postId: number) {

    this.http.postData('unLikeCount', {
      token: localStorage.getItem('token'),
      likeId: likeId
    }).then((res: any) => {
      this.likes(postId);
      this.allPost();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the unlike post',
        showConfirmButton: false,
      })
    })
  }
  likes(postId: number): void {
    this.http.postData('likes', {
      token: localStorage.getItem('token'),
      postId: postId
    }).then((res: any) => {
      this.changeDetector.markForCheck()
      this.totalLikes = res.data.allLikes.likecount;
      return res.data.allLikes.likecount
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the  post likes',
        showConfirmButton: false,
      })
    })
  }

  createComment(postId: number) {
    this.http.postData('createComments', {
      token: localStorage.getItem('token'),
      postId: postId,
      comment: this.commentText

    }).then((res: any) => {
      this.allPost();
      this.getAllComments();
      this.commentText = '';
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting the unlike post',
        showConfirmButton: false,
      })
    })
  }
  getAllComments() {
    this.http.postData('allComments', {
      token: localStorage.getItem('token'),
    }).then((res: any) => {
      this.comments = res.data.comments;
      this.allPost();
    })
  }

  changeLikeStatus() {
    this.commentStatus = !this.commentStatus; // Toggle like status
    this.commentButtonClass = this.commentStatus ? 'comment-active' : 'd-none'; // Update class accordingly
  }

}
