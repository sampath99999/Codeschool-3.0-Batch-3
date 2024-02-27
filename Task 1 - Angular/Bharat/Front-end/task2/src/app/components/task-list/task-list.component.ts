import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  public navbar = [
    {
      name: 'AddTask',
      url: '/add_task',
    },
    {
      name: 'Logout',
      url: '/',
    },
  ];
  public user = {
    token: localStorage.getItem('token'),
  };

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/login']);
    }
    this.dashboard_api();
  }

  data: any[] = [];

  dashboard_api() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post<any>(
        'http://localhost/Task1Server/tasklist.php',
        {
          token: localStorage.getItem('token'),
        },
        { headers }
      )
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.data = response.data.tasks;
            console.log(this.data);
          }
        },
        error: (error) => {
          alert(error.error.message);
          this.router.navigate(['/']);
        },
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
