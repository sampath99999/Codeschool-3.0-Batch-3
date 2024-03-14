import { tableColumnNames, tasks } from './../../common/constant.functions';
import { Component } from '@angular/core';

import { UserServiceService } from '../../services/user-service.service';
import { responseMessage } from '../../common/constant.functions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  tasks = tasks;
  taskStatus: string = "Change Status";
  tableColumnNames = tableColumnNames;
  constructor(public userService: UserServiceService) {
    this.userService.getUserTask().subscribe((result) => {
      this.tasks = result;
      console.log(this.tasks);
    });
  }
  showPromptAndExecuteFunction(taskId: number, index: number) {
    const result = confirm("Do you want to change the status?"); // Second argument is optional default value

    if (result !== null) { // User clicked OK
      // Call your function here
      this.taskStatusUpdate(taskId, index);
    } else {
      console.log("User cancelled the prompt.");
    }
  }


  taskStatusUpdate(taskId: number, index: number) {

    this.userService.taskStatusUpdate(taskId, this.taskStatus).subscribe((result) => {
      this.tasks.tasks[index].status = this.taskStatus;
      this.taskStatus = "Change Status"
      responseMessage(result.status, result.message, false);

    });
  }

}
