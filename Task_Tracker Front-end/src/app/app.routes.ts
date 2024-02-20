import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [{
  'path':'navbar',component :NavbarComponent},
  {
    'path':'contact',component :ContactComponent},

    {
      'path':'',component :HomeComponent},
      {
        'path':'about',component :AboutComponent},
        {
          'path':'login',component :LoginComponent},
          {
            'path':'register',component :RegisterComponent},
            {
              'path':'dashboard',component :DashboardComponent},
              {
                'path':'footer',component :FooterComponent},
      ];
