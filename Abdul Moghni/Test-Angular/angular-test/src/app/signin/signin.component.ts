import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../services/user.service";
import {NavigationBarAfterLoginComponent} from "../navigation-bar-after-login/navigation-bar-after-login.component";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, NgIf, CommonModule, RouterLink, RouterLinkActive,NavigationBarAfterLoginComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  isFormSubmitted: boolean = false;

  posts:any[]=[];

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')

  })




  constructor(private userService: UserService, public router: Router) {
  }

  ngOnInit(): void {

  }


  signIn() {
    this.isFormSubmitted = true;
    console.log(this.form.value.email)

    this.userService.signIn(this.form.value.email, this.form.value.password).subscribe((posts) => {
        this.posts = posts;

        if (posts['validator'] == 'true') {
          localStorage.setItem('token', posts['token']);
          if(posts['role']=="1"){
          this.router.navigate(['/adminUser']);}

          if(posts['role']=="2"){
            this.router.navigate(['/generalUser']);}

          alert("login Successful");

        }

      }, err => {
        alert("Login failed \n Please enter valid credential");
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
