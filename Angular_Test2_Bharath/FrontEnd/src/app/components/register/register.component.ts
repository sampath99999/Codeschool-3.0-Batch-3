import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public navbar = [
    {
      name: 'Home',
      url: '/home',
    },
  ];

  constructor(public http: HttpClient, public router: Router) {
    // if (!localStorage.getItem('token')) {
    //   router.navigate(['/']);
    // }
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
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

  isFormSubmitted = false;

  register():any {
    this.isFormSubmitted = true;
    console.log(this.form.get('username')?.errors);
    if (this.form.invalid) {
      return false;
    }
    this.http
      .post<any>(environment.url + 'register', this.form.value)
      .subscribe((data) => {
        if (data.status == true) {
          Swal.fire({
            icon: 'success',

            text: data.message,
          });
          this.isFormSubmitted = true;
          console.log(this.form.valid);
          this.router.navigate(['/login']);
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

  isFieldInvalid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      (this.form.get(field)?.touched ||
        this.form.get(field)?.dirty ||
        this.isFormSubmitted)
    );
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError('required'))
      return `${label} is required`;
    if (this.form.get(field)?.hasError('minlength'))
      return `${label} should be at least ${
        this.form.get(field)?.getError('minlength').requiredLength
      } characters`;
    if (this.form.get(field)?.hasError('maxlength'))
      return `${label} should be at most ${
        this.form.get(field)?.getError('maxlength').requiredLength
      } characters`;

    return '';
  }
}
