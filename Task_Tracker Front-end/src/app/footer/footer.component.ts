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
import swal from 'sweetalert';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports:  [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    FooterComponent,
    RouterModule,
    HttpClientModule,
    CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  public user = {
    Token: localStorage.getItem('token'),
  };
  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/login']);
    }}
    ngOnInit(): void {}
    logout(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      this.http
        .post<any>(
          'http://localhost/codeSchool/Task_Tracker/Api/logout.php',
          {
            Token: localStorage.getItem('token'),
          },
          { headers }
        )
        .subscribe({
          next: (response) => {

            if (response.status) {

              swal({
                title: "Logout Successfull",
                icon: "success",
                timer: 2000
              });
localStorage.removeItem('token');
this.router.navigate(['/login']);
            } else {
              swal({
                title: "Logout Unsuccessfull ",
                text: response.message,
                icon: "error",
                timer: 2000
              });
            }
          },
          error: (error) => {
            alert(error.error.message); // Assuming error response has a message
            this.router.navigate(['/']); // Navigate back to registration
          },
        });
    }

}
