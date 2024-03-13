import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar-after-login',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar-after-login.component.html',
  styleUrl: './navigation-bar-after-login.component.css'
})
export class NavigationBarAfterLoginComponent implements OnInit {

  name: any = "";
  posts: any[] = [];

  constructor(private userService: UserService, public router: Router) {
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {

        localStorage.setItem('name', posts['data']);
        this.setuser();

      });
    }
  }

  ngOnInit(): void {

  }

  setuser() {
    this.name = localStorage.getItem('name');
  }

  logout() {
    this.userService.logout().subscribe((posts) => {
      this.posts = posts;


    });

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/']);

  }


}
