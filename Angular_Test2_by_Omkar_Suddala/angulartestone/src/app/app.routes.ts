import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './home/user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllTasksComponent } from './admin/all-tasks/all-tasks.component';
import { CreateTaskComponent } from './admin/create-task/create-task.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [

      {
        path: "",
        component: UserComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [

      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'createTask',
        component: CreateTaskComponent
      },
      {
        path: 'allTasks',
        component: AllTasksComponent
      }]
  },
  {
    path: "register",
    component: RegisterComponent
  }

];
