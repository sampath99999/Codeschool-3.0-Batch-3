
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
export interface CreateTasks {
  taskname: string;
  category: string;
  deadline: string;
  description: string;
  priority: string;

}
@Component({
  selector: 'app-createtask',
  standalone: true,
  imports: [HeaderComponent, TabsComponent, MatInputModule, HttpClientModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, AngularEditorModule],
  templateUrl: './createtask.component.html',
  styleUrl: './createtask.component.css'
})
export class CreatetaskComponent {

  task: any = {
    taskname: '',
    category: '',
    deadline: '',
    description: '',
    priority: '',
    userid: localStorage.getItem('userid'),

  };
  constructor(private http: HttpClient, private router: Router) { }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  htmlContent: string = '';
  createTask() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    console.log(this.task);
    this.task.description = this.htmlContent;
    this.http.post<any>('http://localhost/WeekTasks/Server/CreateTask.php', {
      taskname: this.task.taskname,
      category: this.task.category,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      userid: this.task.userid
    },
      {
        headers
      })
      .subscribe({
        next: (response) => {
          if (response.status == false) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });

          } else {
            Swal.fire({
              icon: "success",

              text: response.message,
            });
            this.router.navigate(['/tasks']);
          }
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        },
      });
  }
}

