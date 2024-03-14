import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', title: 'Home Page', component: HomeComponent },
  { path: 'register', title: 'Register page', component: RegisterComponent },
  { path: 'login', title: 'Login page', component: LoginComponent },
  {
    path: 'dashboard',
    title: 'Dashboard page',
    component: DashboardComponent,
  },
  {
    path: 'add-movie',
    title: 'AddMovie page',
    component: AddMovieComponent,
  },
  {
    path: 'movie-list',
    title: 'Movies page',
    component: MovieListComponent,
  },
  {
    path: 'category-list',
    title: 'Categories page',
    component: CategoryListComponent,
  },

  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
];
