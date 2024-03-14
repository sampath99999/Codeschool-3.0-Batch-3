import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, RouterModule, HttpClientModule, CommonModule, SearchPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  searchText = ''

  nameFilter: any = "";
  categoryFilter: any = "";
  priorityFilter: any = "";

  public user = {
    token: localStorage.getItem('token'),
  };

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/signin']);
    }
    this.dashboard_api();
  }
  ngOnInit(): void { }

  data: any;

  dashboard_api() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http.post<any>(
      'http://localhost/Task/taskTracker/api/dashboard.php',
      {
        token: localStorage.getItem('token'),
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.data = response.data;
          } else {
          }
        },
        error: (error) => {
          alert(error.error.message); // Assuming error response has a message
          this.router.navigate(['/']); // Navigate back to registration
        },
      });
  }
}
