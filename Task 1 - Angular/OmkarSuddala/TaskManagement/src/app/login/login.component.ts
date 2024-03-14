import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Component, ViewChild } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
export interface UserData {
  fullname: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTabsModule, SignInComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('tabGroup') tabGroup !: MatTabGroup;
  confirmPassword: string = '';
  message: string = '';
  password: string = '';
  email: string = '';
  emailError: string = '';
  success: string = '';
  emailSuccess: string = '';
  passwordError: string = '';
  passwordSuccess: string = '';
  passwordMessage: string = '';
  public userForm: UserData = { fullname: '', email: "", password: '' };

  constructor(public http: HttpClient, public router: Router) {

  }
  ngOnInit() {
  }


  register() {

    this.checkPassword();
    this.validateEmail();
    this.validatePassword();
    this.registerUser();



  }

  registerUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.password = this.userForm.password;
    this.email = this.userForm.email;
    console.log(this.email);

    this.http
      .post<any>(
        'http://localhost/WeekTasks/Server/UserRegister.php',
        {
          username: this.userForm.fullname,
          email: this.userForm.email,
          password: this.userForm.password
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
            Swal.fire({
              icon: "success",

              text: response.message,
            });
            this.tabGroup.selectedIndex = 0;
            // this.router.navigate(['/login'], { replaceUrl: true }); // Navigate back to registration

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

  validateEmail() {
    const emailRegex = /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

    if (emailRegex.test(this.email)) {
      this.emailError = '';
      this.emailSuccess = 'true';
      this.userForm.email = this.email;
    } else {
      this.emailError = 'Invalid Email Format!';
      this.emailSuccess = 'false';


    }

  }


  validatePassword() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (passwordRegex.test(this.password)) {
      this.passwordError = '';
      this.passwordSuccess = 'true';
      this.passwordMessage = ''
      this.userForm.password = this.password;

    } else {
      this.passwordError = '';
      this.passwordSuccess = 'false';
      this.passwordMessage = 'Password should contain the following:\n' +
        'At least 1 uppercase letter.\n' +
        'At least 1 lowercase letter.\n' +
        'At least 1 number.';


    }
  }
  checkPassword() {

    console.log(this.confirmPassword + "aaa " + this.password);
    this.password.trim();
    this.confirmPassword.trim();

    this.confirmPassword = this.confirmPassword.replace(/\\/g, "");
    this.confirmPassword = encodeURIComponent(this.confirmPassword);
    if (this.passwordSuccess === 'true') {
      if (this.password.trim() !== this.confirmPassword) {
        this.message = 'Please confirm password';
        this.success = 'false';

      } else {
        this.message = 'Password matched';
        this.success = 'true';

      }
    } else {
      this.message = 'Please confirm password';
      this.success = 'false';

    }


  }

}
