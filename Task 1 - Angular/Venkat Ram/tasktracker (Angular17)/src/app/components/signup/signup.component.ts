import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, RouterLinkActive, HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username: "",
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

  signup_api() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(
      'http://localhost/Task/taskTracker/api/signup.php',
      {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          alert(response.message);
          if (response.status == true) {
            this.router.navigate(['/signin']);
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          alert(error.error.message);
          this.router.navigate(['/']);
        },
      });
  }
}
