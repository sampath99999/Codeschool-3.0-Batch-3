import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../Services/user.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import swal from "sweetalert";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NavbarComponent,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isValidator:boolean=false;
role:any;
posts:[]=[];
  constructor(private userService: UserService, public router: Router){
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

  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('',Validators.pattern("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$")),
    password: new FormControl('', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    address:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl(''),
    pinCode:new FormControl(''),
    mobileNumber:new FormControl(''),

  })
  isFormSubmitted = false;

  register() {
    this.isFormSubmitted = true;
    console.log(this.form.valid);
    if (this.form.valid) {
      let fullName = <string>this.form.value.fullName;
      let email = <string>this.form.value.email;
      let password = <string>this.form.value.password;
      let dateOfBirth = <string>this.form.value.dateOfBirth;
      let gender = <string>this.form.value.gender;
      let address = <string>this.form.value.address;
      let city = <string>this.form.value.city;
      let state = <string>this.form.value.state;
      let pinCode = <string>this.form.value.pinCode;
      let mobileNumber = <string>this.form.value.mobileNumber;
      let dateOfRegistrationOfUser: Date = new Date();

      this.userService.register(fullName, email, password, dateOfBirth, gender, address, city, state, pinCode, mobileNumber, dateOfRegistrationOfUser).subscribe((posts) => {
        this.posts = posts;
        if (posts['validator'] == "true") {
          swal({
            title: "Success",
            text: "Register in successful",
            icon: "success",
            timer: 1500,
          });

        }
      }, error => {
        swal({
          title: "Failed",
          text: "Register Failed",
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
