import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {

  movies: any[] = [];
  
  constructor(public http: HttpClient, public route: Router) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/']);
    } else {
      this.showMovies();
    }
  }
  showMovies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    this.http
      .post<any>(
        environment.url + 'showMovies',
        {
          token: localStorage.getItem('token'),
        },
        { headers }
      )
      .subscribe(
        (data) => {
          this.movies = data.Movies;
          console.log(data);
        },
        (err) => {
          err.error.message;
        }
      );
  }
}
