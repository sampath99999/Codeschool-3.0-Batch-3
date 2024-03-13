import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import Swal from 'sweetalert2';
import { ViewPostService } from '../../services/view-post.service';
import { environment } from '../../../environments/environment';
import { ApiServicesService } from '../../services/apiservices.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  allPosts: any = [];
  loaderStatus: boolean = true;
  postImagePath: string = '/assets/images/';
  comments: any = [];
  commentButtonClass = 'd-none';
  commentStatus = false;
  deleteItem: string = 'deleteItem';
  deleteId: string = '#deleteItem';
  constructor(public adminService: AdminServicesService, public viewPostService: ViewPostService, public http: ApiServicesService, public router: Router) {
    this.getAllComments();
  }
  allPost() {
    this.http.postData('allPost', { token: localStorage.getItem('token') }).then((res: any) => {
      this.allPosts = res.data.post;
      this.loaderStatus = false;

    })
  }
 
  getAllComments() {
    this.http.postData('allComments', {
      token: localStorage.getItem('token'),
    }).then((res: any) => {
      this.comments = res.data.comments;
      this.allPost();
    }, (err) => {

    })
  }

  deletePost(postId: number) {
    this.adminService.deletePost(postId).subscribe((result) => {
      Swal.fire('success', 'User deleted successfully');

    });
  }

  commentsView() {
    this.commentStatus = !this.commentStatus; // Toggle like status
    this.commentButtonClass = this.commentStatus ? 'comment-active' : 'd-none'; // Update class accordingly
  }
  viewPost(postId: number) {
    this.router.navigate(['admin/viewPost', postId]);
  }
}
