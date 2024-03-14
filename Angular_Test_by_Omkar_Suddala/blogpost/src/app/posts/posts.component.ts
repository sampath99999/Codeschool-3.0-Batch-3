import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../services/authservice.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  userAuth: any;
  userData: any;
  constructor(private router: Router, private auth: AuthServiceService) {
    this.auth.authService().subscribe((result) => {
      if (!result) {

        this.router.navigate(['/signIn'])
      }
    });
  }

}