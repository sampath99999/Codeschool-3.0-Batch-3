import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  countOfTasks: any = {};
  loader: boolean = true;
  newTasks: number = 0;
  readyTasks: number = 0;
  developmentTasks: number = 0;
  completedTasks: number = 0;
  allTasks: number = 0;
  constructor(public adminService: AdminServiceService) {
    setTimeout
      (() => this.count(), 150);
  }
  count() {
    this.adminService.countOfTasks().subscribe((result) => {
      console.log(result);
      this.newTasks = result.data.newTasks[0].count;
      this.readyTasks = result.data.readyTasks[0].count;
      this.developmentTasks = result.data.developmentTasks[0].count;
      this.completedTasks = result.data.completedTasks[0].count;
      this.allTasks = result.data.allTasks[0].count;
      console.log(this.countOfTasks);

      this.loader = false;
    });
  }
}
