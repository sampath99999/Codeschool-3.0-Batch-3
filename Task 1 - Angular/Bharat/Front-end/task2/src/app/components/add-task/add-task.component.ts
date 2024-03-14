import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  public task = {
    taskName: '',
    category: '',
    priority: '',
    status: '',
    description: '',
    deadline: '',
    user_id: localStorage.getItem('user_id'),
  };

  public navbar = [
    {
      name: 'Dashboard',
      url: '/dashboard',
    },
  ];

  taskName: string = ' ';
  category: string = ' ';
  priority: string = ' ';
  status: string = ' ';
  description: string = ' ';
  deadline: string = ' ';

  public uData: any = [];
  constructor(
    public router: Router,
    private auth: ServicesService,
    private http: HttpClient
  ) {
    // this.uData = this.serv.userInfo;
    console.log(this.uData);

    // this.serv.userData().subscribe((result) => {
    //   console.log(result);
    //   console.log('result');
    // });
    this.auth.authService().subscribe((result) => {
      this.validate(result);
      this.uData = this.auth.userData;

      console.log(this.uData);
    });
  }
  validate(valid: boolean) {
    if (!valid) {
      this.router.navigate(['dashboard']);
    }
  }

  addTask() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    this.http
      .post<any>(
        'http://localhost/Task1Server/addtask.php',
        {
          task_name: this.task.taskName,
          category: this.task.category,
          priority: this.task.priority,
          status: this.task.status,
          description: this.task.description,
          deadline: this.task.deadline,
          user_id: this.uData.user.user_id,
        },
        { headers }
      )

      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.status == false) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            });
          } else {
            Swal.fire({
              icon: 'success',

              text: response.message,
            });

            this.router.navigate(['/task_list']);
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        },
      });
  }
}
