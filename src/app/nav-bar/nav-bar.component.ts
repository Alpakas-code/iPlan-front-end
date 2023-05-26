import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { AppService } from '../Services/app.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  companyname : any;
  constructor(private cookie:CookieService,private router:Router, private Service : AppService) { }

  ngOnInit(): void {
    const companyId : number = +this.cookie.get("id");
    const company = this.Service.getCompanyById(companyId).subscribe(data =>{
      this.companyname = data.name;
    });
    
  }
  logout(){
    this.cookie.deleteAll('/profil');
    this.cookie.deleteAll('/');
    this.router.navigate(['/login']);
  }
}
