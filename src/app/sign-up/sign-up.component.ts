import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../Services/app.service';
import user from 'src/models/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  addForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,private Service:AppService, private cookie:CookieService) { }

  ngOnInit(): void {
    this.addForm=this.fb.group({
      email:['',[Validators.required,Validators.maxLength(30)]],
      firstName:['',[Validators.required,Validators.maxLength(30)]],
      lastName:['',[Validators.required,Validators.maxLength(30)]],
      phoneNumber:['',[Validators.required,Validators.maxLength(30)]],
      company:['',[Validators.required,Validators.maxLength(60)]],
      password:['',[Validators.required,Validators.maxLength(50)]],
      role:['',[Validators.required,Validators.maxLength(50)]],
      });
  }
Signup(){
  
  let u = new user();
  u.fullName = this.addForm.value.firstName+" "+this.addForm.value.lastName;
  u.email = this.addForm.value.email;
  u.password = this.addForm.value.password;
  u.phoneNumber= this.addForm.value.phoneNumber;
  u.role = this.addForm.value.role;
  u.companyId = 1;
  console.log(u);
  this.Service.addUser(u).subscribe((data) => { 
    console.log(data);
    this.cookie.set("id",data.userId);
    this.cookie.set("idC",data.companyId);
    this.router.navigate(['/projects']);
});

}
redirectLogin(){
  this.router.navigate(['/login']);
}
}
