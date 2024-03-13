import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../services/authservice.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiServicesService } from '../services/apiservices.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any = [];
  allPost: any = [];
  postImagePath: string = 'assets/images/';
  fullName: string = '';



  constructor(private auth: AuthServiceService, private router: Router, private apiService: ApiServicesService) {

    this.auth.authService().subscribe(data => {
      console.log(data);
      this.userData = data;
      console.log(this.userData);
      this.validate(data);

      if (!data) {
        console.log(this.userData);
        this.router.navigate(['/signIn']);
      } else {

        this.userData = this.auth.userData;
      }
    })



  }
  validate(valid: boolean) {
    if (!valid) {
      this.router.navigate(['signIn'])
    } else {
      this.allPosts();
    }
  }

  allPosts() {
    this.apiService.postData('postCount', { token: localStorage.getItem('token') }).then((res: any) => {
      this.allPost = res.data.postCount;
      return this.allPost;
    })
  }
  editProfile() {
    this.apiService.postData('editProfile', this.fullName).then((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Your profile has been updated successfully',
        showConfirmButton: false,
      })
      alert("");
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error getting while editing the profile',
        showConfirmButton: false,
      })
    })
  }
  viewPost(postId: number) {
    this.router.navigate(['posts/viewPost', postId]);
  }
}
