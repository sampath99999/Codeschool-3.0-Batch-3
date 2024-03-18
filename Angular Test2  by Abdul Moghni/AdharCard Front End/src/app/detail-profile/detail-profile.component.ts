import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../Services/user.service";
import {AdminService} from "../Services/admin.service";
import swal from "sweetalert";

@Component({
  selector: 'app-detail-profile',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,NgIf],
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.css'
})
export class DetailProfileComponent {
  role: string = "";
  isValidator: boolean = false;
  datas: [] = [];
  email:any;


  isFormSubmitted = false;

  form = new FormGroup({
    address:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl(''),
    pinCode:new FormControl(''),
    mobileNumber:new FormControl(''),

  })


  constructor(private userService: UserService, public router: Router, private adminService: AdminService){
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe((posts) => {
        this.isValidator = posts['validator'];
        this.role = posts['role'];
        if (this.isValidator != true && this.role == "user") {
          router.navigate(['/']);
        } else {
          this.adminService.getUserProfileDetail().subscribe((datas) => {
            this.datas = datas['data'];
          });
        }


      });
    }
    if (!localStorage.getItem('token')) {
      router.navigate(['/']);
    }


  }






  updateUserData(){
    let address=<string>this.form.value.address;
    let city=<string>this.form.value.city;
    let state=<string>this.form.value.state;
    let pinCode=<string>this.form.value.pinCode;
    let mobileNumber:string=<string>this.form.value.mobileNumber;

    this.isFormSubmitted = true;
    if(this.form.valid){
      this.adminService.updateUserData(address,city,state,pinCode,mobileNumber).subscribe((posts) => {
        if(posts['validator']=="true") {
          swal({
            title: "Success",
            text: "Updated successfully",
            icon: "success",
            timer: 2000,
          });
        }
        else{
          swal({
            title: "failed",
            text: "Update failed",
            icon: "error",
            timer: 2000,
          });
        }

      });
    }

  }


















  logout(){

      this.userService.logout().subscribe((posts) => {


      });

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigate(['/']);


  }




  isFieldInvalid(field: string) {
    return this.form.get(field)?.invalid && (this.form.get(field)?.touched || this.form.get(field)?.dirty || this.isFormSubmitted)
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError("required")) return `${label} is required`;
    if (this.form.get(field)?.hasError("minlength")) return `${label} should be at least ${this.form.get(field)?.getError("minlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("maxlength")) return `${label} should be at most ${this.form.get(field)?.getError("maxlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }








}
