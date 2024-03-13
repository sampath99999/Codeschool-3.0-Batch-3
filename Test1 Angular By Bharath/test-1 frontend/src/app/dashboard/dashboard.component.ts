import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

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
      name: 'AddEmployee',
      url: '/add-employee',
    },
    {
      name: 'Logout',
      url: '/',
    },
  ];
  employees: any[] = [];

  constructor(public http: HttpClient, public route: Router) {
    this.getEmployee();
  }

  getEmployee() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    this.http
      .post<any>(
        environment.url + 'getEmployee',
        {
          token: localStorage.getItem('token'),
        },
        { headers }
      )
      .subscribe(
        (data) => {
          this.employees = data.Employee;
          console.log(data);
        },
        (err) => {
          err.error.message;
        }
      );
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
