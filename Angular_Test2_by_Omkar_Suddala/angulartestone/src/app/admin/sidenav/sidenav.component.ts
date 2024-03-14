import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
interface MenuItem {
  label: string;
  link: string,
  isButton?: boolean
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  menuItems: MenuItem[] = [

    {
      label: 'Create Task',
      link: 'createTask'
    },
    {
      label: 'All Tasks',
      link: 'allTasks'
    }

  ];
  constructor(public router: Router) { }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
