import { responseMessage, tableColumnNames, tasks } from './../../common/constant.functions';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
interface TableItems {
  label: string;
}
@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent {
  tasks = tasks;

  tableColumnNames: TableItems[] = [
    {
      label: 'S.no'
    }, {
      label: 'Task name'
    },
    {
      label: "Description"
    },
    {
      label: 'Deadline'
    },
    {
      label: 'Status'
    }
  ];

  constructor(public adminService: AdminServiceService) {
    this.adminService.getAllTasks().subscribe((result) => {
      console.log(result);
      this.tasks = result;
    });
  }

  // taskStatusUpdate(taskId: number) {
  //   this.userService.taskStatusUpdate(taskId, this.taskStatus).subscribe((result) => {
  //     responseMessage(result.status, result.message, false);

  //   });
  // }

}
