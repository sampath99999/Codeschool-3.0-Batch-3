import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, RouterLinkActive, HttpClientModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  public user = {
    email: "",
    password: ""
  }

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }

  signin_api() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let password = this.user.password;
    let email = this.user.email;

    this.http.post<any>(
      'http://localhost/Task/taskTracker/api/signin.php',
      {
        email: this.user.email,
        password: this.user.password
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          alert(response.message);
          if (response.status) {
            localStorage.setItem('token', response.data[0])
            localStorage.setItem('username', response.data[1][0].username)
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          alert(error.error.message);
          this.router.navigate(['/']);
        },
      });
  }
}
