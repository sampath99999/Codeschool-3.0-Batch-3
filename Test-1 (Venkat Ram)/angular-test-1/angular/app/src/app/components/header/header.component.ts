import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public http: HttpClient, public router: Router) {
    // if (localStorage.getItem('token')) {
    //   router.navigate(['/'])
    // }
  }

  getItem(value: string) {
    return localStorage.getItem(value)
  }

  login() {
    this.router.navigate(['/login']);
  }

  signout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    alert("Signed Out Successfully!");
    this.router.navigate(['/']);
  }

}
