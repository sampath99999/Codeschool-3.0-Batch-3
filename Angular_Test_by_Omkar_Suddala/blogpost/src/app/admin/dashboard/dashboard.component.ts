import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  countUserAndPosts: any = [];
  constructor(public adminService: AdminServicesService) {
    this.adminService.countUserAndPosts().subscribe((result) => {
      this.countUserAndPosts = result;
    });

  }



}
