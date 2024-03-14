import { RestApiService } from './../services/rest-api.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { responseMessage } from '../common/constant.functions';

interface UserRegisterData {
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)]),
    password: new FormControl('', [Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    // file: ['', Validators.required]
  });
  loader = false;
  isFormSubmitted = false;
  emailErrorMessage: string = '';
  userRegisterData: UserRegisterData = {
    username: '',
    email: '',
    password: '',
  };


  constructor(private router: Router, public auth: AuthServiceService, private api: RestApiService, private fb: FormBuilder) {
    this.auth.authService().subscribe((result: boolean) => {
      if (result) {
        this.router.navigate([''])
      }
    });
  }

  register() {
    this.loader = true;
    this.isFormSubmitted = true;
    this.userRegisterData = {
      username: this.form.value['username'],
      email: this.form.value['email'],
      password: this.form.value['password'],
    }
    if (this.form.valid) {
      this.api.postData('register', this.userRegisterData).then(
        (response: any) => {

          if (!response.status) {
            this.loader = false;
            responseMessage("error", response.message, false);

          } else if (response.status) {
            this.loader = false;
            responseMessage("success", response.message, false);
            this.router.navigate(['/login']);

          } else if (response.status == 'message') {
            this.emailErrorMessage = response.message;
            this.loader = false;
          }
        },
        error => {
          console.error("Error in API", error);
        }
      );
    } else {
      this.loader = false;
    }
  }

}
