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

info:any;
role:any;
  constructor(private userService: UserService, public router: Router){
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.info = posts['validator'];
        if (this.info != "true") {
          router.navigate(['/']);
        }

      });
    }
    if (!localStorage.getItem('token')) {
      router.navigate(['/']);
    }



    });
  }
ngOnInit(): void {

}
  RegisterActiveCheckbox:boolean=true;
  BlogActiveCheckbox:boolean=false;
  UserAccessCheckbox:boolean=false;
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
