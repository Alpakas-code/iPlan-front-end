import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../Services/app.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addForm: FormGroup;
  AssignForm: FormGroup;
  rdf : any[] = [];
  ip : any[] = [];
  done : any[] = [];
  p: any[] = [];
  users: any[] = [];
  constructor(private router: Router,private fb: FormBuilder,private Service:AppService,private toastr: ToastrService) { }
  display = "none";
  displaye = "none";
  ngOnInit() {
    this.AssignForm =this.fb.group({
      
      members:['',[Validators.required,Validators.maxLength(60)]],
      projects:['',[Validators.required,Validators.maxLength(60)]],
      });
    this.addForm=this.fb.group({
      projectName:['',[Validators.required,Validators.maxLength(50)]],
      status:['',[Validators.required,Validators.maxLength(60)]],
      
      });
      this.Service.getAllUsers().subscribe(data => {
        for (let element of data ){
          this.users.push(element);
        }
      })

      this.Service.getAllProjects().subscribe(projects => {
        this.p = projects;
        
        
        var k = 0;
        for (let i=0; i<this.p.length; i++) {
          
          
          if(this.p[i].status == 1)
          this.rdf.push(this.p[i]);
        
          if(this.p[i].status == 2)
          this.ip.push(this.p[i]);
          
          if(this.p[i].status == 3)
          this.done.push(this.p[i]);
     }
     
     
     
      });
      var project = this.Service.getAllProjects();
      
        
      }
     
   
  openModal() {
    this.display = "block";
    
  }
  onCloseHandled() {
    this.display = "none";
  }
  openModale() {
    this.displaye= "block";
    
  }
  onCloseHandlede() {
    this.displaye = "none";
  }
  addProject(){
    
    var obj = {
      'name' : this.addForm.value.projectName,
      'status' : this.addForm.value.status
    }
    this.Service.addProject(obj).subscribe(data => { 
    this.display = "none";
    this.addForm.value.projectName ="";
    this.addForm.value.status="";
    this.showToast();
    
  });
  
  }
  showToast(){
    this.toastr.success('Added Successfully ','New Project');
    this.router.navigate(['/projects']);
  }
  AssignMember(){
    this.addForm.value
    var obj = {
      "userId": this.AssignForm.value.members,
      "projectId" : this.AssignForm.value.projects
    }
    //console.log(obj);
    this.Service.AssignUserToProject(obj).subscribe(data=>
      {
        console.log(data.toString().length);
        
        if(data.toString().length ==15){
          this.showToaster();
          
        }else{
          this.showToasterErr();
        }
      } 
        );
        this.displaye = "none";
  }
  showToaster(){
    this.toastr.success('Assigned Successfully ','Member');
    this.router.navigate(['/projects']);
  }
  showToasterErr(){
    this.toastr.error('Not Assigned ','Member');
    this.router.navigate(['/projects']);
  }
}
