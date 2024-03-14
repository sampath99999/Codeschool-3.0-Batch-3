import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TabsComponent } from '../tabs/tabs.component';
import { HeaderComponent } from '../../header/header.component';
import { AsyncPipe } from '@angular/common';

import { Observable, Observer } from 'rxjs';
import { TruncatePipe } from './truncate.pipe';
import { FormsModule } from '@angular/forms';

export interface Token {
  userToken: string | null
}

export interface Tasks {
  category: string;
  deadline: string;
  description: string;
  priority: string;
  status: string;
  taskname: string;
  userid: number;
  username: string;
}

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CommonModule, FormsModule, HttpClientModule, TabsComponent, HeaderComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
  currentPage: number = 1;
  pageSize: number = 9;
  totalItems: number = 0;
  photosNotFound: string = "";
  new: any[] = [];
  searchTerm: string = '';
  searchCategory: string = '';
  searchPriority: string = '';
  tokens: Token = {
    userToken: localStorage.getItem('token')
  }
  loading: boolean = true;
  public allt: Tasks[] = [];
  constructor(private http: HttpClient, private router: Router) {
    if (!localStorage.getItem("token")) {
      router.navigate(['/login']);
    }
    setTimeout(() => {
      this.taskData()
    }, 2000);
    this.visibleData();

  }
  ngOnInit(): void {

  }

  taskData() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http
      .post<any>(
        'http://localhost/WeekTasks/Server/TaskList.php',
        {

          token: this.tokens.userToken

        },
        { headers }
      )
      .subscribe({
        next: (response) => {

          if (!localStorage.getItem('userid')) {
            localStorage.setItem('userid', response.data.tasks.userid);
            console.log("hello")
          }
          console.log("hii")

          console.log(response.data.tasks);
          this.allt = [...response.data.tasks];
          this.new = this.allt;

          this.loading = false;
          // console.log(this);

          // Assuming response is an object with a message property
        },
        error: (error) => {
          alert(error.error.message); // Assuming error response has a message
          this.router.navigate(['/home']); // Navigate back to registration
        },
      });
  }

  visibleData() {
    let startIndex = (this.currentPage - 1) * this.pageSize;
    return this.new.slice(startIndex, startIndex + this.pageSize);
  }
  nextPage() {
    this.currentPage++;
    if (this.totalItems < this.currentPage) {
      this.photosNotFound = 'No more data available';
      alert("No more data available");
    } else {
      console.log('Current Page', this.currentPage);
      this.visibleData();
      this.photosNotFound = '';

    }

  }
  previousPage() {
    this.currentPage--;
    if (this.totalItems < this.currentPage) {
      this.photosNotFound = 'No more data available';
      alert("No more data available");
    } else {
      console.log('Current Page', this.currentPage);
      this.visibleData();
      this.photosNotFound = '';

    }
  }
  pageNumbers() {
    this.totalItems = this.new.length / this.pageSize
    this.totalItems = Math.ceil(this.totalItems);
    let totalPage = this.totalItems;
    let pageNumbers = new Array(totalPage);
    return pageNumbers;
  }

  handleClick(pageIndex: number) {
    this.currentPage = pageIndex; // Update current page on click
  }
  onSearch() {
    if (this.searchTerm && this.searchPriority && this.searchCategory) {
      this.new = this.allt.filter(item =>
        item.taskname.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.priority.toLowerCase().includes(this.searchPriority.toLowerCase()) &&
        item.category.toLowerCase().includes(this.searchCategory.toLowerCase()));
    } else if (this.searchTerm && this.searchPriority || this.searchCategory) {
      this.new = this.allt.filter(item =>
        item.taskname.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.priority.toLowerCase().includes(this.searchPriority.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchCategory.toLowerCase()));
    }
    else if (this.searchTerm || this.searchPriority && this.searchCategory) {
      this.new = this.allt.filter(item =>
        item.taskname.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.priority.toLowerCase().includes(this.searchPriority.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchCategory.toLowerCase()));
    }
    else if (this.searchTerm || this.searchPriority || this.searchCategory) {
      this.new = this.allt.filter(item =>
        item.taskname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.priority.toLowerCase().includes(this.searchPriority.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchCategory.toLowerCase()));
    } else {
      this.new = this.allt; // Show all data if no search term
    }
  }
}
