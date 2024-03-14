import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../services.service';

export interface Token {
  userToken: string | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public navbar = [
    {
      name: 'AddTask',
      url: '/add_task',
    },

    {
      name: 'Task-List',
      url: '/task_list',
    },
    {
      name: 'Logout',
      url: '/login',
    },
  ];
  public uData: any = [];
  constructor(public router: Router, private auth: ServicesService) {
    console.log(this.uData);

    this.auth.authService().subscribe((result) => {
      this.validate(result);
      this.uData = this.auth.userData;

      console.log(this.uData);
    });
  }
  validate(valid: boolean) {
    if (!valid) {
      this.router.navigate(['dashboard']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
