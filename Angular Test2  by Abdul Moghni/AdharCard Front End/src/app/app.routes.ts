import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

import {DetailProfileComponent} from "./detail-profile/detail-profile.component";

export const routes: Routes = [
  {
    'path': '', component: LoginComponent
  },
  {
    'path': 'register', component: RegisterComponent
  },
  {
    'path': 'admin', component: AdminDashboardComponent
  },
  {
    'path': 'profileDetail', component: DetailProfileComponent
  },
  {
    'path':'userProfile',component:UserProfileComponent
  }

];
