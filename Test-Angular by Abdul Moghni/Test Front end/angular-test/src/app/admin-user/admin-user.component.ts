import {Component, OnInit} from '@angular/core';
import {NavigationBarAfterLoginComponent} from "../navigation-bar-after-login/navigation-bar-after-login.component";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BlogsComponent} from "../blogs/blogs.component";
import {UserAccessControlComponent} from "../user-access-control/user-access-control.component";
import {UserRegisterComponent} from "../user-register/user-register.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [NavigationBarAfterLoginComponent,RouterLink,RouterLinkActive,BlogsComponent,UserAccessControlComponent,UserRegisterComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  RegisterActiveCheckbox:boolean=true;
  BlogActiveCheckbox:boolean=false;
  UserAccessCheckbox:boolean=false;
info:any;
role:any;
  constructor(private userService: UserService, public router: Router){
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.info = posts['validator'];
this.role=posts['role'];
        if (this.info != "true" && this.role=="2") {
          router.navigate(['/']);
        }

      });
    }
    if (!localStorage.getItem('token')) {
      router.navigate(['/']);
    }




  }
ngOnInit(): void {

}

  registrationActive(){
    this.RegisterActiveCheckbox=true;
    this.BlogActiveCheckbox=false;

    this.UserAccessCheckbox=false;
  }
  blogActive(){
    this.BlogActiveCheckbox=true;
    this.UserAccessCheckbox=false;
    this.RegisterActiveCheckbox=false;
  }
  userAccessControl(){
    this.UserAccessCheckbox=true;
    this.RegisterActiveCheckbox=false;
    this.BlogActiveCheckbox=false;

  }

}
