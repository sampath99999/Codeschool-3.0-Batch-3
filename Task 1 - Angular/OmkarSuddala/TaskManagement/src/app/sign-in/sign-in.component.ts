import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
export interface Login {
  email: string;
  password: string;
}
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  userLogin: Login = { email: '', password: '' };
  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem("token")) {
      router.navigate(['/home']);
    }
  }
  ngOnInit() { }

  login() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http
      .post<any>(
        'http://localhost/WeekTasks/Server/UserLogin.php',
        {

          email: this.userLogin.email,
          password: this.userLogin.password

        },
        { headers }
      )
      .subscribe({
        next: (response) => {

          if (response.status == false) {
            this.router.navigate(['/login']);
            // Navigate back to registration
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          } else {
            localStorage.setItem('token', response.data.token);

            this.router.navigate(['/home']); // Navigate back to registration
            Swal.fire({
              icon: "success",

              text: response.message,
            });
          }
          // Assuming response is an object with a message property
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          }); // Assuming error response has a message
          this.router.navigate(['/login']); // Navigate back to registration
        },
      });
  }
}
