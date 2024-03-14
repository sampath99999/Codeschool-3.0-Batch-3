import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', title: 'Home Page', component: HomeComponent },
  { path: 'home', title: 'Home Page', component: HomeComponent },
  { path: 'login', title: 'Login Page', component: LoginComponent },
  { path: 'register', title: 'Register Page', component: RegisterComponent },
  { path: 'add_task', title: 'Task Page', component: AddTaskComponent },
  { path: 'dashboard', title: 'Dashboard Page', component: DashboardComponent },
  { path: 'task_list', title: 'Task-List Page', component: TaskListComponent },
];
