import { HttpClient } from '@angular/common/http';
import { Component, Pipe } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/authservice.service';
import { environment } from '../../environments/environment';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  emailMessage: string = '';
  passwordMessage: string = '';
  username: string = this.firstName + '' + this.lastName;
  usernameMessage: string = '';
  constructor(private http: HttpClient, private router: Router, private auth: AuthServiceService) {

  }
  usernameValidate() {
    this.usernameMessage = "";
    if (this.firstName.length < 3 && this.lastName.length < 3) {
      this.usernameMessage = "• Username must be at least 4 characters long.<br>";
    }
  }
  emailValidate() {
    this.email = this.email.toLowerCase();
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (emailRegex.test(this.email)) {
      this.http.post<any>(environment.apiUrl + 'userExist', {
        email: this.email,
      }).subscribe((data) => {

        this.emailMessage = '' + data.message;

      }, err => {
        console.error(err)
        // this.emailMessage = err.error.message;

      });
    } else {
      this.emailMessage = '• Please enter a valid e-mail address';
    }
  }
  passwordValidate() {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const upperCase = /^(?=.*?[A-Z])/;
    const lowerCase = /^(?=.*?[a-z])/;
    const specialChar = /^(?=.*?[#?!@$ %^&*-])/;
    const digit = /^(?=.*?\d)/;

    this.passwordMessage = "• Password must contain these : <br>"; // Initialize empty message string

    if (!upperCase.test(this.password)) {
      this.passwordMessage += "• At least one uppercase letter.\n <br>";
    }

    if (!lowerCase.test(this.password)) {
      this.passwordMessage += "• At least one lowercase letter.\n <br>";
    }

    if (!specialChar.test(this.password)) {
      this.passwordMessage += "• At least one special character (#?!@$ %^&*-).\n <br>";
    }

    if (!digit.test(this.password)) {
      this.passwordMessage += " • At least one digit.\n <br>";
    }

    // Trim any trailing newline character (ensures better usage in forms)
    this.passwordMessage = this.passwordMessage.trim();

    // Display the combined message if necessary
    if (this.passwordMessage !== "") {
      //  alert("Invalid password:\n" + this.passwordMessage);
      this.passwordMessage += '• At least 8 characters';

    }
    if (passwordRegex.test(this.password)) {
      this.passwordMessage = '';
    }
  }
  signUp() {
    this.usernameValidate();
    this.emailValidate();
    this.passwordValidate();
    this.http.post<any>(environment.apiUrl + 'register', {
      email: this.email,
      password: this.password,
      username: this.firstName + ' ' + this.lastName,

    }).subscribe((data) => {
      if (data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Signed up successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/signIn']);

      } else {
        // alert(data.message);
        this.emailMessage = data.message;
      }


    }, err => {
      // console.error(err)
      this.emailMessage = err.error.message;
    });

  }
}
