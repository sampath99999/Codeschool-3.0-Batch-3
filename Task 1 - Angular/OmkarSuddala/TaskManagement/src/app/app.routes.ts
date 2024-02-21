import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "signin",
        component: SignInComponent
    },
    {
        path: "home",
        component: HomeComponent,
        title: "Dashboard"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    },
];
