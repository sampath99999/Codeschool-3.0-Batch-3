import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

interface MenuItem {
  label: string;
  link: string,
  isButton?: boolean
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      link: '/'
    }

  ];
  constructor(public router: Router) { }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
