import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent {
  movieFormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    director: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    rating: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
    poster_url: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/),
    ]),
    // watched: new FormControl(false),
    categories: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  formSubmitted: boolean = false;

  constructor(public http: HttpClient, public route: Router) {
    if (!localStorage.getItem('token')) {
      route.navigate(['/']);
    } else {
      this.addMovie();
    }
  }

  isFieldInvalid(field: string) {
    return (
      this.movieFormGroup.get(field)?.invalid &&
      (this.movieFormGroup.get(field)?.touched ||
        this.movieFormGroup.get(field)?.dirty ||
        this.formSubmitted)
    );
  }
  getErrorMessage(field: string, label: string): string {
    let formControlErrors = this.movieFormGroup.get(field)?.errors;
    if (formControlErrors) {
      let firstError = Object.keys(
        this.movieFormGroup.get(field)?.errors as Object
      )[0];
      switch (firstError) {
        case 'required':
          return `${label} is required`;
        case 'minlength':
          return `${label} must be at least ${formControlErrors['minlength']?.requiredLength} characters`;
        case 'maxlength':
          return `${label} must be at most ${formControlErrors['maxlength']?.requiredLength} characters`;
      }
    }
    return '';
  }

  addMovie(): any {
    this.formSubmitted = true;
    // console.log(this.movieFormGroup.get('')?.errors);
    // if (this.movieFormGroup.invalid) {
    //   return false;
    // }
    this.http
      .post<any>(environment.url + 'addMovie', this.movieFormGroup.value)
      .subscribe(
        (data) => {
          this.route.navigate(['/dashboard']);
          console.log(data);
        },
        (err) => {
          err.error.message;
        }
      );
  }
}
