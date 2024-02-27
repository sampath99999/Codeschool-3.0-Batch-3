import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public user = { username: '', email: '', password: '' };

  public navbar = [
    {
      name: 'Home',
      url: '/home',
    },
  ];

  password: string = '';
  email: string = '';
  username: string = '';

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/']);
    }
  }
  getDetails() {
    console.log(this.user);
  }

  registerUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post<any>(
        'http://localhost/Task1Server/register.php',
        {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        },
        { headers }
      )

      .subscribe({
        next: (response) => {
          // alert(response.message);
          Swal.fire({
            icon: 'success',

            text: response.message,
          });

          if (response.status == true) {
            this.router.navigate(['/login']);
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });

          this.router.navigate(['/']);
        },
      });
  }
}
