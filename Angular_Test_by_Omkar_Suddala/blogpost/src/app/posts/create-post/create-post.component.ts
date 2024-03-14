import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../services/authservice.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, NavbarComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  postTitle: string = '';
  postCaption: string = '';
  imageUrl: string | null = null;
  data: any = [];
  imageError: string = '';
  titleError: string = '';
  captionError: string = '';
  token: any = {
    token: localStorage.getItem('token')
  }

  files: FileList | null = null;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',


  };

  constructor(private http: HttpClient, private router: Router, private auth: AuthServiceService) {

    this.auth.authService().subscribe((result) => {
      this.validate(result)
      // this.userData = this.auth.userData;

      // console.log(this.userData)
    });
  }
  validate(valid: boolean) {
    if (!valid) {

      this.router.navigate(['/signIn'])
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.files = event.target.files;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadPost() {
    this.imageError = '';
    if (!this.files) {
      Swal.fire
        ({
          icon: 'error',

          text: "All feilds are required."

        })
      this.imageError = 'Please Select an image';
      return;
    }
    const formData = new FormData();

    formData.append('file', this.files[0]);
    formData.append('postTitle', this.postTitle);
    formData.append('postCaption', this.postCaption);
    formData.append('token', this.token.token);


    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data",
    })
    this.http.post<any>(environment.apiUrl + 'createPost',
      formData, {
      headers: headers,
    }
    ).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Post Created successfully',
        showConfirmButton: false,

      })
      this.router.navigate([''])
    }, err => {
      if (err.error.status == 'title') {
        this.imageError = '';
        this.titleError = err.error.message;
      } else if (err.error.status = 'caption') {
        this.imageError = '';
        this.titleError = '';
        this.captionError = err.error.message;

      }
    })
  }



}


