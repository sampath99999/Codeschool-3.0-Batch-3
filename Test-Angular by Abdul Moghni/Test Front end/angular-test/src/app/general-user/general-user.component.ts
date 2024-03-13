import { Component } from '@angular/core';
import {NavigationBarAfterLoginComponent} from "../navigation-bar-after-login/navigation-bar-after-login.component";
import {BlogsComponent} from "../blogs/blogs.component";


import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserAccessControlComponent} from "../user-access-control/user-access-control.component";

@Component({
  selector: 'app-general-user',
  standalone: true,
  imports: [NavigationBarAfterLoginComponent, BlogsComponent,UserAccessControlComponent],
  templateUrl: './general-user.component.html',
  styleUrl: './general-user.component.css'
})
export class GeneralUserComponent {
  blogActiveCheckbox:boolean=true;
  userAccessControlCheckbox:boolean=false;
  info:any;
  role:any;
  constructor(private userService: UserService, public router: Router) {
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.info = posts['validator'];
        this.role=posts['role'];
        if (this.info != "true" && this.role=="1") {
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

  userAccessControl(){
    this.userAccessControlCheckbox=true;
    this.blogActiveCheckbox=false;
  }

  blogActive(){
    this.userAccessControlCheckbox=false;
    this.blogActiveCheckbox=true;
  }




}
