import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
interface Navbar {
  name: string;
  url: string;
}
export interface Token {
  userToken: string | null
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  navLinks: Navbar[] = [
    { "name": 'Home', "url": "/home" },
    { "name": 'Tasks', "url": "/tasks" },

  ];
  tokens: Token = {
    userToken: localStorage.getItem('token')
  }
  userInfo: any;

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem("token")) {
      router.navigate(['/login']);
    };


  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.userData();
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
          this.userInfo = response.data.user;
          console.log(this.userInfo);
          // Assuming response is an object with a message property
        },
        error: (error) => {
          alert(error.error.message); // Assuming error response has a message
          this.router.navigate(['/home']); // Navigate back to registration
        },
      });
  }
}
