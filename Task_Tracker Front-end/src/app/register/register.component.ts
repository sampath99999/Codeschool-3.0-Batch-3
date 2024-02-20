import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,RouterLinkActive, HttpClientModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public user = {
    Name:"",
    Email:"",
     Password:"",
     User_Bio:"",
  }

constructor(public http:HttpClient, public router: Router){
  if(localStorage.getItem('token')){
    router.navigate(['/'])
  }
}
  ngOnInit(): void {

     }

     submit_data() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

      this.http
        .post<any>(
          'http://localhost/codeSchool/Task_Tracker/Api/register.php',
          {
            Name:this.user.Name,
            Email: this.user.Email,
            Password: this.user.Password,
            User_Bio:this.user.User_Bio
          },
          { headers }
        )
        .subscribe({
          next: (response) => {

            if (response.status == true) {


              this.router.navigate(['/login']);

              swal({
                title: "Register Successful",
                icon: "success",
                timer: 2000

              });

            } else {


              swal({
                title: "Register Unsuccessful",
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
