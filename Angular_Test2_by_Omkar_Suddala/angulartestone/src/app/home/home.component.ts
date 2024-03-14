import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { Router, RouterOutlet } from "@angular/router";
import { RestApiService } from '../services/rest-api.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private apiService: RestApiService, private router: Router, private auth: AuthServiceService) {

    this.auth.authService().subscribe((result: { status: boolean, message: string, data: any }) => {
      if (!result.status) {
        this.router.navigate(['/login'])
      } else if (result.data.user_type == 'Admin') {
        console.log(result)
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['']);

      }

    });
  }

}
