import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  addForm: FormGroup;
  AssignForm: FormGroup;
  updateForm: FormGroup;
  name: string;
  id:any;projectId :any;
  display:string="none";
  displaye:string= "none";
  displaya:string="none";
  users: any[] = [];
  tasks :any;
  idProject:any;
  rdf: any[] =[];
  ip : any[] = [];
  done : any[] = [];
  constructor(private route:ActivatedRoute,private router: Router,private fb: FormBuilder,private Service:AppService,private toastr: ToastrService) { }
  
  openModal() {
    this.display = "block";
    
  }
  onCloseHandled() {
    this.display = "none";
  }
  openModale() {
    this.displaya = "block";
    
  }
  onCloseHandlede() {
    this.displaya = "none";
  }
  openModalAssign() {
    this.displaye = "block";
    
  }
  onCloseHandledAssign() {
    this.displaye = "none";
  }
  ngOnInit(): void {



    this.idProject = this.route.snapshot.params['id'];
    
    
    this.Service.getTaskByProject(this.idProject).subscribe(projects => {
      this.tasks = projects;
      console.log(this.tasks);
      
      var k = 0;
      for (let i=0; i<this.tasks.length; i++) {
        
        
        if(this.tasks[i].status == 1)
        this.rdf.push(this.tasks[i]);
      
        if(this.tasks[i].status == 2)
        this.ip.push(this.tasks[i]);
        
        if(this.tasks[i].status == 3)
        this.done.push(this.tasks[i]);
   }
   
   
   
    });
    
    







    this.AssignForm =this.fb.group({
      
      members:['',[Validators.required,Validators.maxLength(60)]],
      tasks:['',[Validators.required,Validators.maxLength(60)]],
      });

    this.addForm=this.fb.group({
      title:['',[Validators.required,Validators.maxLength(50)]],
      type:['',[Validators.required,Validators.maxLength(60)]],
      description:['',[Validators.required,Validators.maxLength(60)]],
      taskpoints:['',[Validators.required,Validators.maxLength(60)]],
      priority:['',[Validators.required,Validators.maxLength(60)]],
      status:['',[Validators.required,Validators.maxLength(60)]],
      });
      this.Service.getAllUsers().subscribe(data => {
        for (let element of data ){
          this.users.push(element);
        }
      })
  }
  addTask(){
    
    var id = this.route.snapshot.paramMap.get('id');
    var obj = {
      "projectId": id,
      "title": this.addForm.value.title,
      "status": this.addForm.value.status,
      "description": this.addForm.value.description,
      "taskPoints": this.addForm.value.taskpoints,
      "priority": this.addForm.value.priority,
      "type": this.addForm.value.type

    }
    this.Service.addTask(obj).subscribe(data=>console.log(data));
    console.log(obj);
    this.display="none";
    this.showToastSuccess();
  }
  update(name:string, projectId:number){
    
  }
  delete(id:number){
    this.Service.deleteTask(id).subscribe(data=>console.log(data));
    console.log(id);
  }
  AssignMemberToTask(){
    
    var obj = {
      "userId":this.AssignForm.value.members
    }
    console.log(obj);
    this.Service.AssignMemberToTask(this.AssignForm.value.tasks,obj).subscribe(data=>console.log(data));
    this.showToaster();
    this.displaye="none";
  }
  showToaster(){
    this.toastr.success('Assigned Successfully ','Member');
   
  }
  showToastSuccess(){
    this.toastr.success('Added Successfully ','Task');
    
  }

}
