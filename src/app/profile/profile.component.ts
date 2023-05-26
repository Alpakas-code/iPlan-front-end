import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../Services/app.service';
import user from 'src/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fullname : any;
  phonenumber : any;
  email : any;
  company : any;
  role : any;
  companydomain: any;
  userId : any;
  constructor(private cookie : CookieService,private Service : AppService) { }

  ngOnInit(): void {
    const id : number = +this.cookie.get("id");
    const u = this.Service.getUserById(id).subscribe(data =>{
      console.log(data);
      this.userId = data.userId;
      this.companydomain = data.companyDomain;
      this.fullname = data.fullName;
      this.phonenumber = data.phoneNumber;
      this.email = data.email;
      this.company = this.Service.getCompanyById(data.companyId);
      this.role = data.role;
    });
  }

}
