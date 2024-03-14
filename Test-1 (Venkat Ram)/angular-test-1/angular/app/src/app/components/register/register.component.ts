import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/'])
    }
  }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`),
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  register() {
    console.log(this.registerForm.value)
    let user = this.registerForm.value
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(
      'http://localhost/test/api/register.php',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          alert(response.message);
          if (response.status == true) {
            this.router.navigate(['/login']);
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