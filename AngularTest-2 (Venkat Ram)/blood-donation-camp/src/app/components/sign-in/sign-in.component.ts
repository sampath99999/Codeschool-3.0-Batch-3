import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {

    public user = {
        email: "",
        password: ""
    }

    constructor(public http: HttpClient, public router: Router) {
        if (localStorage.getItem('token') && localStorage.getItem('donor')) {
            router.navigate(['/detail-entry'])
        } else if (localStorage.getItem('token') && localStorage.getItem('recipient')) {
            router.navigate(['/dashboard'])
        }
    }

    signInForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(10)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
    });

    get email() {
        return this.signInForm.get('email');
    }

    get password() {
        return this.signInForm.get('password');
    }

    submit() {
        let user = this.signInForm.value
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        this.http.post<any>(
            `${environment.api_url}/signin.php`, user, { headers }
        )
            .subscribe({
                next: (response) => {
                    if (response.status) {
                        Swal.fire({
                            icon:"success",
                            title: response.message,
                            showConfirmButton: false,
                        })
                        localStorage.setItem('token', response.data[0])
                        localStorage.setItem('username', response.data[1][0].name)
                        this.router.navigate(['/']);
                    } else{
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

    signUp() {
        this.router.navigate(['/sign-up']);
    }
}
