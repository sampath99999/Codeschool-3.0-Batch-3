import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [FormsModule, SearchPipe, CommonModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

	searchText: string = ""; 

	constructor(public http: HttpClient, public router: Router) {
		if (!localStorage.getItem('token')) {
			router.navigate(['/sign-in'])
		}
		this.viewAllDonors();
	}

	data: [] = [];

	viewAllDonors() {
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});

		this.http.post<any>(
			`${environment.api_url}/dashboard.php`, { headers }
		)
			.subscribe({
				next: (response) => {
					if (response.status) {
						console.log(response.data)
						this.data = response.data;
					} else {
					}
				},
				error: (error) => {
					alert(error.error.message); // Assuming error response has a message
					this.router.navigate(['/']); // Navigate back to registration
				},
			});
	}
}
