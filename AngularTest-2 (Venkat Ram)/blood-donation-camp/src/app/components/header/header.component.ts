import { Component, booleanAttribute } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, HttpClientModule, DashboardComponent, SignInComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})

export class HeaderComponent {

	constructor(public http: HttpClient, public router: Router) {
		if (localStorage.getItem('token')) {
			router.navigate(['/'])
		}
	}

	donor() {
		this.router.navigate(['/detail-entry'])
	}

	recipient() {
		this.router.navigate(['/dashboard'])
	}

	getItem(value: string) {
		return localStorage.getItem(value)
	}

	signin() {
		this.router.navigate(['/sign-in']);
	}

	signout() {
		Swal.fire({
			icon: "success",
			title: "Sign Out Successful!",
			showConfirmButton: false,
			timer: 15000
		})
		this.router.navigate(['/']);
		localStorage.clear()
	}
}
