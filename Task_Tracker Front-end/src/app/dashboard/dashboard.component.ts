import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    FooterComponent,
    RouterModule,
    HttpClientModule,
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  Filter_Category:any="";
  Filter_Priority:any="";

  Filter_Name:any="";
  public user = {
    Token: localStorage.getItem('token'),
  };

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/login']);
    }
    this.submit_data();
  }
  ngOnInit(): void {}

  Data!: [];

  submit_data() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post<any>(
        'http://localhost/codeSchool/Task_Tracker/Api/displaytask.php',
        {
          Token: localStorage.getItem('token'),
        },
        { headers }
      )
      .subscribe({
        next: (response) => {

          if (response.status) {
            swal({
              title: "Displaying Data",
              icon: "success",
              timer: 2000
            });
            this.Data = response.data;


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
