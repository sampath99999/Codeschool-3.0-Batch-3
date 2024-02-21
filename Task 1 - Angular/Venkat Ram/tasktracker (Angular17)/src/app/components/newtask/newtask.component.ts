import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, RouterLinkActive, HttpClientModule, FormsModule],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  public task = {
    taskName: "",
    category: "",
    priority: "",
    taskDesc: "",
    deadline: "",
    taskStatus: "",
    token: localStorage.getItem('token')
  }

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/signin'])
    }
  }

  ngOnInit(): void {
  }

  newtask_api() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(
      'http://localhost/Task/taskTracker/api/newtask.php',
      {
        taskName: this.task.taskName,
        category: this.task.category,
        priority: this.task.priority,
        taskDesc: this.task.taskDesc,
        deadline: this.task.deadline,
        taskStatus: this.task.taskStatus,
        token: localStorage.getItem('token')
      },
      { headers }
    )
      .subscribe({
        next: (response) => {
          if (response.status == true) {
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