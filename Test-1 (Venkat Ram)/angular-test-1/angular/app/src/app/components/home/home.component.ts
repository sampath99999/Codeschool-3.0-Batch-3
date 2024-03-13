import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user_type_id = localStorage.getItem('user_type_id')
  
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
      'http://localhost/test/api/dashboard.php',
      {
        token: localStorage.getItem('token'),
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.data = response.data;
            console.log(response)
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
