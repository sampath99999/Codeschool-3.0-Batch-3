import { RestApiService } from './../services/rest-api.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  formSubmitted: boolean = false;
  loader: boolean = false;
  errorMessage: string = '';
  apiService: RestApiService = inject(RestApiService);
  router = inject(Router);
  http = inject(HttpClient);
  constructor(public auth: AuthServiceService) {
    if (localStorage.getItem('token') && localStorage.getItem("token") !== null) {
      this.router.navigate([''])
    }


  }

  login(): any {
    this.loader = true;
    this.formSubmitted = true;
    console.log(this.loginFormGroup.get("email")?.errors);
    if (this.loginFormGroup.invalid) {
      this.loader = false;
      return;
    }
    this.apiService.postData("login", this.loginFormGroup.value).then((res: any) => {
      console.log(res)
      localStorage.setItem("token", res.token);
      this.loader = false;
      this.router.navigate([""]);
    }, (err: any) => {
      if (err.error.status == 'message') {
        this.loader = false;

        this.errorMessage = err.error.message;

      }
      console.log(err);
    })
  }


}
