import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'
})
export class ClaimComponent {
  public claim = {
    name: "",
    amt: "",
    from: "",
    to: "",
    modeOfTravel: "",
    ownership: "",
    airTicket: "",
    railTicket: "",
    railClass: "",
    token: localStorage.getItem('token')
  }

  constructor(public http: HttpClient, public router: Router) {
    if (!localStorage.getItem('token')) {
      router.navigate(['/signin'])
    }
  }

  ngOnInit(): void {
  }

  makeAClaim() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>(
      'http://localhost/test/api/claim.php',
      {
        name: this.claim.name,
        amt: this.claim.amt,
        from: this.claim.from,
        to: this.claim.to,
        modeOfTravel: this.claim.modeOfTravel,
        ownership: this.claim.ownership,
        airTicket: this.claim.airTicket,
        railTicket: this.claim.railTicket,
        railClass: this.claim.railClass,
        token: localStorage.getItem('token')
      },
      { headers }
    )
      .subscribe({        
        next: (response) => {
          if (response.status == true) {
            console.log(response)
          } else {
            console.log(response)
          }
        },
        error: (error) => {
          alert(error.error.message); 
          this.router.navigate(['/']);
        },
      });
    this.router.navigate(['/']);
  }
}
