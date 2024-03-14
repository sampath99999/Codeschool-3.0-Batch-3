import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
	
	constructor(public http: HttpClient, public router: Router) {
		if (localStorage.getItem('token')) {
			router.navigate(['/'])
		}
	}

	signUpForm = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.email, 
			Validators.minLength(10),
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		]),
		username: new FormControl('', [
			Validators.required,
			Validators.minLength(4)
		])
	})

	get email(){
		return this.signUpForm.get('email');
	}

	get password(){
		return this.signUpForm.get('password');
	}

	get username(){
		return this.signUpForm.get('username');
	}


	signUp() {
		let user = this.signUpForm.value
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		this.http.post<any>(
			`${environment.api_url}/signUp.php`, user, { headers }
		)
			.subscribe({
				next: (response) => {
					if (response.status) {
						Swal.fire({
							icon:"success",
							title: response.message,
							showConfirmButton: false,
						})
						this.router.navigate(['/sign-in']);
					} else {
						Swal.fire({
							icon:"error",
							title: response.message,
							showConfirmButton: false,
						})
						this.router.navigate(['/sign-in']);
					}
				},
				error: (error) => {
					Swal.fire({
                        icon:"error",
                        title: error.error.message,
                        showConfirmButton: false,
                    })
					this.router.navigate(['/']);
				},
			});
	}
}
