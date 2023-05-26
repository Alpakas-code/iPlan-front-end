import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppService } from '../Services/app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styleUrls: ['./show-projects.component.css']
})
export class ShowProjectsComponent implements OnInit {
  status :any;
  updateForm: FormGroup;
  display : string = "none";
  projectId :any;
  name: string;
  id:any;
  p: any[] = [];
  rdf: any[] =[];
  ip : any[] = [];
  done : any[] = [];
  obj : any;
  constructor(private route:ActivatedRoute,private router: Router,private fb: FormBuilder,private Service:AppService,private cookie: CookieService) { }
  openModale(id: number,name:string) {
    this.display = "block";
    this.projectId = id;
    this.name=name;
  }
  onCloseHandlede() {
    this.display = "none";
  }
  ngOnInit(): void {
  this.status = this.route.snapshot.paramMap.get('id');
  this.Service.getAllProjects().subscribe(projects => {
    this.p = projects;
    this.updateForm = this.fb.group({
      projectName: ['', Validators.required],
      status: ['', Validators.required],
      projectId: ['']
    });
    
    var k = 0;
    this.Service.getAllProjects().subscribe(projects => {
      this.p = projects;
      console.log(this.p);
      
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
 
 console.log(this.rdf);
 
  });
  
  }
  getTeamByProject(id:number):number{
    var x= 0;
    var tab = this.Service.getTeamCollabsByProject(id);
    tab.subscribe(data=>{
    })


    return 0;
  }
  delete(id:number){
    this.Service.deleteProject(id).subscribe(data=>console.log(data));
    console.log(id);
  }
  update(name:string,projectId:number){
    
   // this.Service.updateProject(this.updateForm);
   var n;
   if(this.updateForm.value.projectName === ""){
    n=name;
   }else {
    n= this.updateForm.value.projectName;
   }
   var obj={
    "projectId" : projectId,
    "projectName" : n,
    "status": this.updateForm.value.status
   }
   console.log(obj);
   this.Service.updateProject(projectId,obj).subscribe(data=>{console.log(data)});
  }
}
