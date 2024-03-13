import { Component } from '@angular/core';
import { ViewPostService } from '../../services/view-post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminServicesService } from '../../services/admin-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  postId: number = 0;
  blogImagePath: string = '/assets/images/';
  comments: any = [];

  constructor(public view: ViewPostService, private route: ActivatedRoute, public adminService: AdminServicesService) {

    this.route.params.subscribe(params => {
      this.postId = params['postId'];
    });

    this.view.viewPostService(this.postId).subscribe((result1) => {
    });
    this.view.viewPostsComments(this.postId).subscribe((result) => {
      this.comments = result;
    });
  }



  deleteComment(commentId: number, Index: number) {
    this.adminService.deleteComment(commentId).subscribe((result) => {
      console.log(result)
      if (result) {
        const updatedComments = [...this.comments].slice(0, Index).concat([...this.comments].slice(Index + 1));
        this.comments = updatedComments;
        Swal.fire({
          icon: 'success',
          title: 'Comment deleted successfully',
          showConfirmButton: false,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete Comment',
          showConfirmButton: false,
        })
      }
    })
  }

}
