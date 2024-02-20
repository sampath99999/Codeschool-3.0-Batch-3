import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
name:string="";
email:any="";
message:string="";
public Contact_Us_Detail: { name:any,
  email:any,
  message:any }[] = [];


Contact_Us_Message(){

  let Temporary_Contact_Us_Detail = {
    name: this.name,
    email:this.email ,
    message: this.message
  };
  if (Temporary_Contact_Us_Detail.name !== "" && Temporary_Contact_Us_Detail.email !=="" && Temporary_Contact_Us_Detail.message !=="") {
    this.Contact_Us_Detail.push(Temporary_Contact_Us_Detail);
  }

}
}
