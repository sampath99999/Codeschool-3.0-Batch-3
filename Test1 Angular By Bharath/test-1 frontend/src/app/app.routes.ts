import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'admin-login', title: 'Login page', component: AdminLoginComponent },
  { path: 'dashboard', title: 'Dashboard page', component: DashboardComponent },
  {
    path: 'add-employee',
    title: 'Add Employee page',
    component: AddEmployeeComponent,
  },

  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
];
