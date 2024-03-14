import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-detail-entry',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './detail-entry.component.html',
	styleUrl: './detail-entry.component.css'
})
export class DetailEntryComponent {
	
	constructor(public http: HttpClient, public router: Router) {
        if (!localStorage.getItem('token')) {
            router.navigate(['/sign-in'])
        }
    }

	entryForm = new FormGroup({
		name: new FormControl('', [
			Validators.required,
			Validators.minLength(10),
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email, 
			Validators.minLength(10),
		]),
		phoneNumber: new FormControl('', [
			Validators.required,
			Validators.minLength(10),
		]),
		bloodGroup: new FormControl('', [
			Validators.required,
		]),
		conditions: new FormControl(''),
		age: new FormControl('', [
			Validators.required,
			Validators.max(65),
			Validators.min(18),
		]),
		city: new FormControl('', [
			Validators.required,
		])
	})

	get name(){
		return this.entryForm.get('name');
	}

	get email(){
		return this.entryForm.get('email');
	}

	get phoneNumber(){
		return this.entryForm.get('phoneNumber');
	}

	get bloodGroup(){
		return this.entryForm.get('bloodGroup');
	}

	get conditions(){
		return this.entryForm.get('conditions');
	}

	get age(){
		return this.entryForm.get('age');
	}

	get city(){
		return this.entryForm.get('city');
	}

	registerAsADonor(){
		let donorDetails = this.entryForm.value;

		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		this.http.post<any>(
			`${environment.api_url}/entry.php`, donorDetails, { headers }
		)
			.subscribe({
				next: (response) => {
					if (response.status) {
						Swal.fire({
							icon:"success",
							title: response.message,
							showConfirmButton: false,
						})
						this.router.navigate(['/thanks']);
					} else {
						Swal.fire({
							icon:"error",
							title: response.message,
							showConfirmButton: false,
						})
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
