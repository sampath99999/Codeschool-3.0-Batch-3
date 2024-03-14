import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../services/authservice.service';

interface MenuItem {
  label: string;
  link: string,
  isButton?: boolean
}
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  menuItems: MenuItem[] = [

    {
      label: 'Users',
      link: 'usersList'
    },
    {
      label: 'Posts',
      link: 'postList',
    }
  ];
  constructor(public authentication: AuthServiceService, private router: Router) {
    this.authentication.adminValidation().subscribe((result) => {
      if (!result) {

        this.router.navigate(['/signIn'])
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['signIn'])
  }
}
