import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/'])
    }
  }


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  submit() {
    let user = this.loginForm.value
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(
      'http://localhost/test/api/login.php',
      {
        email: user.email,
        password: user.password,
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          alert(response.message);
          console.log(response.data)
          if (response.status) {
            localStorage.setItem('token', response.data[0])
            localStorage.setItem('username', response.data[1][0].username)
            localStorage.setItem('user_type_id', response.data[1][0].user_type_id)
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          alert(error.error.message);
          this.router.navigate(['/']);
        },
      });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
