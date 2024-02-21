// import { UserData } from './../sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
export interface Token {
  userToken: string | null
}
export interface Resultt {
  count: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  task: any[] = [{ count: 0 }];
  taskTo: Resultt[] = [{ count: 1 }];
  taskProgress: Resultt[] = [{ count: 1 }];
  taskCompleted: Resultt[] = [{ count: 0 }];

  tokens: Token = {
    userToken: localStorage.getItem('token')
  }


  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem("token")) {
      router.navigate(['/login']);
    }

  }
  ngOnInit(): void {
    this.userData();
    this.listOfTasks();
  }

  userData() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http
      .post<any>(
        'http://localhost/WeekTasks/Server/userdata.php',
        {

          token: this.tokens.userToken

        },
        { headers }
      )
      .subscribe({
        next: (response) => {
          if (!localStorage.getItem('userid')) {
            localStorage.setItem('userid', response.data.user.userid);
            console.log("hello")
          }
          console.log("hii")

          // Assuming response is an object with a message property
        },
        error: (error) => {
          alert(error.error.message); // Assuming error response has a message
          this.router.navigate(['/home']); // Navigate back to registration
        },
      });
  }

  listOfTasks() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http
      .post<any>(
        'http://localhost/WeekTasks/Server/CountTasks.php',
        {

          token: localStorage.getItem('token')

        },
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.task = [response.data.result];
          this.taskTo = [response.data.result1];
          this.taskProgress = [response.data.result2];
          this.taskCompleted = [response.data.result3];

          console.log(this.taskProgress)
          console.log("hello")
          console.log(this.task)

          // Assuming response is an object with a message property
        },
        error: (error) => {
          alert(error.error.message); // Assuming error response has a message
          this.router.navigate(['/home']); // Navigate back to registration
        },
      });
  }
}