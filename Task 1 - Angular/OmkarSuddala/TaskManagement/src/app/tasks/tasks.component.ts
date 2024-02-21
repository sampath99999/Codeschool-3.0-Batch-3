import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  constructor(public router: Router) {
    if (!localStorage.getItem("token")) {
      this.router.navigate(['signin']);

    }
  }
}
