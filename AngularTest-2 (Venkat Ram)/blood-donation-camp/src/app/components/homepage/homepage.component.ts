import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.css'
})
export class HomepageComponent {

	constructor(public http: HttpClient, public router: Router) {
		if (localStorage.getItem('token') && localStorage.getItem('donor')) {
            router.navigate(['/detail-entry'])
        } else if (localStorage.getItem('token') && localStorage.getItem('recipient')){
            router.navigate(['/dashboard'])
        }
	}

	donor() {
		localStorage.setItem('donor', 'true')
		localStorage.removeItem('recipient');
		this.router.navigate(['/detail-entry'])
	}

	recipient() {
		localStorage.setItem('recipient', 'true')
		localStorage.removeItem('donor');
		this.router.navigate(['/dashboard'])
	}

}
