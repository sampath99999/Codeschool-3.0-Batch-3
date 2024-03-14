import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public navbar = [
    {
      name: 'AddMovie',
      url: '/add-movie',
    },
    {
      name: 'Categories',
      url: '/category-list',
    },
    {
      name: 'Movies',
      url: '/movie-list',
    },
    {
      name: 'Logout',
      url: '/',
    },
  ];

  constructor(public http: HttpClient, public route: Router) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/home']);
    } else {
      route.navigate(['/dashboard']);
    }
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
