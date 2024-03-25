import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  posts:any;
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('',Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")),
    password: new FormControl('', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
    role:new FormControl('2')
  })
  isFormSubmitted = false;

  constructor(private userService: UserService, public router: Router){

  }

  ngOnInit(): void {

  }

  register() {
    this.isFormSubmitted = true;
    this.userService.register(this.form.value.name,this.form.value.email,this.form.value.password,this.form.value.role).subscribe((posts) => {
      this.posts = posts;
      if (posts['validator'] == "true") {
        alert("Register of user successful");

      }
    }, error => {
      alert("Register Failed \n Something is Missing!!");
    });

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
