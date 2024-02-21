import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SigninComponent, HttpClientModule, DashboardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem('token')) {
      router.navigate(['/'])
    }
  }

  getItem(value: string) {
    return localStorage.getItem(value)
  }

  signout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    alert("Signed Out Successfully!");
    this.router.navigate(['/']);
  }
}
