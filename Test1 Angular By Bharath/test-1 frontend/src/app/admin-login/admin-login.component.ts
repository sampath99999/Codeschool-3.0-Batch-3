import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
  });

  formSubmitted: boolean = false;

  isFieldInvalid(field: string) {
    return (
      this.loginFormGroup.get(field)?.invalid &&
      (this.loginFormGroup.get(field)?.touched ||
        this.loginFormGroup.get(field)?.dirty ||
        this.formSubmitted)
    );
  }

  getErrorMessage(field: string, label: string): string {
    let formControlErrors = this.loginFormGroup.get(field)?.errors;
    if (formControlErrors) {
      let firstError = Object.keys(
        this.loginFormGroup.get(field)?.errors as Object
      )[0];
      switch (firstError) {
        case 'required':
          return `${label} is required`;
        case 'minlength':
          return `${label} must be at least ${formControlErrors['minlength']?.requiredLength} characters`;
        case 'maxlength':
          return `${label} must be at most ${formControlErrors['maxlength']?.requiredLength} characters`;
      }
    }
    return '';
  }

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  validator: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
    if (localStorage.getItem('token')) {
      this.auth.authService().subscribe((result) => {
        if (!result) {
          this.auth.adminValidation().subscribe((result) => {
            if (result) {
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          this.router.navigate(['']);
        }
      });
    }
  }
  validate(valid: boolean) {
    if (valid) {
    }
  }

  login() {
    this.http
      .post<any>(environment.url + 'login', this.loginFormGroup.value)
      .subscribe((data) => {
        if (data.status == true) {
          Swal.fire({
            icon: 'success',

            text: data.message,
          });
          localStorage.setItem('token', data.token);
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
          });
        }
        console.log(data);
      });
  }
}
