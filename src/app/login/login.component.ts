import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../Services/app.service';
import user from 'src/models/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,private Service:AppService,private cookie: CookieService) { }

  ngOnInit(): void {
    this.addForm=this.fb.group({
      email:['',[Validators.required,Validators.maxLength(30)]],
      password:['',[Validators.required,Validators.maxLength(50)]],
      });
  }
  login(){
    let u = new user();
    u.email = this.addForm.value.email;
    u.password = this.addForm.value.password;
    this.Service.login(u).subscribe(data=>{console.log(data);
      if(data.userId != null){
        this.router.navigate(['/projects']);
        this.cookie.set("id",data.userId);
        this.cookie.set("idC",data.companyId);
      }
      else{
        this.router.navigate(['/login']);
      }
      console.log(data);
    });
    
  }
redirectSignup(){
  this.router.navigate(['/signup']);
}
}
