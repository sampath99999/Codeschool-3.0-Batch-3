import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  public submit = false;

  public employeeForm = new FormGroup({
    full_name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    doj: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    basic_pay: new FormControl('', Validators.required),
    hra: new FormControl('', Validators.required),
    incentives: new FormControl('', Validators.required),
    pf: new FormControl('', Validators.required),
    income_tax: new FormControl('', Validators.required),
  });
  constructor(public http: HttpClient, public router: Router) {}
  submitForm() {
    this.submit = true;
    this.addEmployee();
  }
  addEmployee() {
    this.http
      .post<any>(environment.url + 'addEmployee', this.employeeForm.value)
      .subscribe(
        (data) => {
          this.router.navigate(['/dashboard']);
          console.log(data);
        },
        (err) => {
          err.error.message;
        }
      );
  }
}
