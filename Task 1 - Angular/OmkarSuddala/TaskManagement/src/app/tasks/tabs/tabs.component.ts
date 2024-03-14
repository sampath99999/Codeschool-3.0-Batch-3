
import { Component, OnInit } from '@angular/core';
// import { HeaderComponent } from '../header/header.component';
import { Observable, Observer } from 'rxjs';
// import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AllComponent } from '../all/all.component';

export interface ExampleTab {
  label: string;
  content: string;
  url: string;
}
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, RouterLink, RouterLinkActive, AllComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'All', content: '', url: '/tasks/all' },
          { label: 'Completed', content: '', url: '/tasks/completed' },
          { label: 'Create Task', content: '', url: '/tasks/create' },

        ]);
      }, 1000);
    });
  }
  ngOnInit(): void {
  }


}


