import { Component } from '@angular/core';
import { ViewPostService } from '../../services/view-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  postImagePath: string = '/assets/images/';
  comments: any = [];
  constructor(public view: ViewPostService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];


    });
    this.view.viewPostService(this.postId).subscribe((result1) => {
    },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error getting the  Post ',
          showConfirmButton: false,
        })
      }
    )
    this.view.viewPostsComments(this.postId).subscribe((result) => {
      this.comments = result;
      console.log(this.comments);

    },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error getting the post comments',
          showConfirmButton: false,
        })
      })
  }


}
