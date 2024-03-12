import { Component } from '@angular/core';
import {NavigationBarAfterLoginComponent} from "../navigation-bar-after-login/navigation-bar-after-login.component";
import {BlogsComponent} from "../blogs/blogs.component";
import {UserAccessControlComponent} from "../user-access-control/user-access-control.component";
import {UserRegisterComponent} from "../user-register/user-register.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-general-user',
  standalone: true,
  imports: [NavigationBarAfterLoginComponent, BlogsComponent, UserAccessControlComponent, UserRegisterComponent],
  templateUrl: './general-user.component.html',
  styleUrl: './general-user.component.css'
})
export class GeneralUserComponent {

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

  BlogActiveCheckbox:boolean=false;
  UserAccessCheckbox:boolean=false;

  blogActive(){
    this.BlogActiveCheckbox=true;
    this.UserAccessCheckbox=false;

  }
  userAccessControl(){
    this.UserAccessCheckbox=true;

    this.BlogActiveCheckbox=false;

  }
}
