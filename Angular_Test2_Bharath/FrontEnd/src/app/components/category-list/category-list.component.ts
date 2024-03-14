import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories: string = '';
    
  constructor(public http: HttpClient, public route: Router) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/']);
    } else {
      this.showCategories();
    }
  }


  showCategories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    this.http
      .post<any>(
        environment.url + 'showCategories',
        {
          token: localStorage.getItem('token'),
        },
        { headers }
      )
      .subscribe(
        (data) => {
          this.categories = data.Categories;
          console.log(data);
        },
        (err) => {
          err.error.message;
        }
      );
  }
}
