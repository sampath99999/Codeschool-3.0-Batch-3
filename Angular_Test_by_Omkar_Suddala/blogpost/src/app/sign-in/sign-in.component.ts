import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/authservice.service';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = "";
  validator: boolean = false;
  constructor(private http: HttpClient, private router: Router, private auth: AuthServiceService) {


    if (localStorage.getItem('token')) {
      this.auth.authService().subscribe((result) => {
        if (!result) {
          this.auth.adminValidation().subscribe((result) => {
            if (result) {
              this.router.navigate(['admin'])
            }
          })
        } else {
          this.router.navigate(['posts'])
        }
      });
    }
  }
  login() {
    this.http.post<any>(environment.apiUrl + 'login', {
      email: this.email,
      password: this.password

    }).subscribe((data) => {

      if (data.status == "admin") {

        localStorage.setItem('token', data[0].token);
        this.router.navigate(['admin'])
      } else if (data.status == 'user') {
        localStorage.setItem('token', data[0].token);
        this.router.navigate([''])
      }
      else {
        this.errorMessage = data.message;
      }
    }, err => {
      this.errorMessage = err.error.message;
    });

  }

}
