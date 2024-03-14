import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormGroupName, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public user = { email: '', password: '' };

  email: string = '';
  password: string = '';
  public navbar = [
    {
      name: 'Home',
      url: '/home',
    },
  ];
  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['dashboard']);
    }
  }

  getDetails() {
    console.log(this.user);
  }

  login() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post<any>(
        'http://localhost/Task1Server/login.php',
        {
          email: this.user.email,
          password: this.user.password,
        },
        { headers }
      )

      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',

            text: response.message,
          });
          if (response.status) {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            this.router.navigate(['/dashboard']);
            this.getDetails();
          }
        },

        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        },
      });
  }
}
