import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../Services/user.service";
import {AdminService} from "../Services/admin.service";
import swal from "sweetalert";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  role: string = "";
  isValidator: boolean = false;
  datas: [] = [];

  constructor(private userService: UserService, public router: Router, private adminService: AdminService) {
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.isValidator = posts['validator'];
        this.role = posts['role'];
        if (this.isValidator != true && this.role == "user") {
          router.navigate(['/']);
        } else {
          this.adminService.getAdminTableDetail().subscribe((datas) => {
            this.datas = datas['data'];
          });
        }


      });
    }
    if (!localStorage.getItem('token')) {
      router.navigate(['/']);
    }


  }

  deleteUser(emailOfUser: string) {
    this.adminService.deleteUser(emailOfUser).subscribe((confirmation: any) => {
      if (confirmation['validator']) {
        swal({
          title: "Success",
          text: "User deleted successful ",
          icon: "success",
          timer: 2000,
        });

      }
    });
  }

  showProfile(email: string) {
    this.adminService.setUserEmail(email);
    this.router.navigate(['/profileDetail']);
  }

  logout() {
    this.userService.logout().subscribe((posts) => {


    });

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/']);

  }



}
