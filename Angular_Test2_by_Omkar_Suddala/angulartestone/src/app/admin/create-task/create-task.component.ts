import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { AdminServiceService } from '../../services/admin-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { RestApiService } from '../../services/rest-api.service';
import { responseMessage } from '../../common/constant.functions';

interface Users {
  id: number;
  username: string;
}

interface CreateTask {
  User_Assign: string | null | undefined;
  Title: string | null | undefined;
  description: string | null | undefined;
  deadline: string | null | undefined;
}

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],

  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  form = this.fb.group({
    User_Assign: new FormControl('Assign to User', Validators.required),
    Title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
    // file: ['', Validators.required]
  });
  loader = false;
  isFormSubmitted = false;
  titleErrorMessage: string = '';
  taskCreation: CreateTask = {
    User_Assign: '',
    Title: '',
    description: '',
    deadline: ''
  };
  users: any = [];

  constructor(private router: Router, public adminService: AdminServiceService, public auth: AuthServiceService, private api: RestApiService, private fb: FormBuilder) {
    this.adminService.getAllUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }
  validateDate(deadline: any) {
    const today = new Date();
    const inputDate = new Date(deadline);

    if (inputDate > today) {
      return true
    } else {
      responseMessage('error', 'Please enter a future date.', true);
      return false;
    }
  }

  createTask() {
    this.loader = true;
    this.isFormSubmitted = true;
    const deadline = this.form.value['deadline'];

    this.taskCreation = {
      User_Assign: this.form.value['User_Assign'],
      Title: this.form.value['Title'],
      description: this.form.value['description'],
      deadline: this.form.value['deadline']
    }
    if (this.form.valid && this.validateDate(deadline)) {
      this.api.postData('createTask', this.taskCreation).then(
        (response: any) => {

          if (!response.status) {
            this.loader = false;
            responseMessage("error", response.message, false);

          } else {
            this.loader = false;
            responseMessage("success", response.message, false);
            this.router.navigate(['']);
          }
        },
        error => {
          console.error("Error in API", error);
        }
      );
    }
  }

}
