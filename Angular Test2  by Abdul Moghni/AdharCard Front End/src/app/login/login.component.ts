import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../Services/user.service";
import {NavbarComponent} from "../navbar/navbar.component";
import swal from "sweetalert";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NavbarComponent,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  posts:[]=[];
  isFormSubmitted = false;
  role:any;
  isValidator:boolean=false;

  form = new FormGroup({
    email:new FormControl('',Validators.pattern("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$")),
    password:new FormControl('')
  })


  constructor(private userService: UserService,public router: Router){
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.isValidator = posts['validator'];
        this.role=posts['role'];

        if (this.isValidator && this.role=="user") {
          router.navigate(['/userProfile']);
        }
        else if (this.isValidator && this.role=="admin") {
          router.navigate(['/admin']);
        }
        else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }
      });


    }
  }
  logIn() {
    let email=<string>this.form.value.email;
    let password=<string>this.form.value.password;
    this.isFormSubmitted = true;


    if(this.form.valid){
      this.userService.logIn(email, password).subscribe((posts) => {
        this.posts = posts;
        if(posts['validator']=='true'){
          swal({
            title: "Success",
            text: "Log in successful",
            icon: "success",
            timer: 2000,
          });

          localStorage.setItem('token',posts['token']);
          localStorage.setItem('email',posts['email']);
          if(posts['role']=='admin'){
          this.router.navigate(['/admin']);}

          if(posts['role']=='user'){
            this.router.navigate(['/userProfile']);
          }


        }

      }, error => {
        swal({
          title: "Login failed",
          text: "Please enter valid credential ",
          icon: "error",
          timer: 1500,
        });
      });
    }
    }


  isFieldInvalid(field: string) {
    return this.form.get(field)?.invalid && (this.form.get(field)?.touched || this.form.get(field)?.dirty || this.isFormSubmitted)
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError("required")) return `${label} is required`;
    if (this.form.get(field)?.hasError("minlength")) return `${label} should be at least ${this.form.get(field)?.getError("minlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("maxlength")) return `${label} should be at most ${this.form.get(field)?.getError("maxlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }
}
