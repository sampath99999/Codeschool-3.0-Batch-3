import {Routes} from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserAccessControlComponent} from "./user-access-control/user-access-control.component";
import {GeneralUserComponent} from "./general-user/general-user.component";

export const routes: Routes = [
  {
    'path': '', component: SigninComponent
  },
  {
    'path': 'adminUser', component: AdminUserComponent
  },

  {
    'path': 'generalUser', component: GeneralUserComponent
  },





];
