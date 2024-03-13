import { Component } from '@angular/core';
import { ApiServicesService } from '../../services/apiservices.service';
import { AdminServicesService } from '../../services/admin-services.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
interface TableItem {
  label: string;

}
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: any = [];
  tableItems: TableItem[] = [

    {
      label: 'S.No',

    },
    {
      label: 'Full name',

    },
    {
      label: 'Email',

    },
    {
      label: 'CreatedAt',

    },
    {
      label: 'Action',

    }
  ];
  deleteItem: string = 'deleteItem';
  deleteId: string = '#deleteItem';
  constructor(public api: ApiServicesService, public adminService: AdminServicesService) {
    this.adminService.getAllUsers().subscribe((result) => {
      this.users = result;
    });

  }


  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe((result) => {
      Swal.fire('success', 'User deleted successfully');

    });
  }

}
