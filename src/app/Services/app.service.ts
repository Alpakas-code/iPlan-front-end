import { Injectable } from '@angular/core';
import user from 'src/models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
private UrlLogin :string = "http://localhost:3000/auth/login";
private UrlRegister :string =  "http://localhost:3000/auth/register";
private BaseUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  ///////////////// USER //////////////////////////////////
  public addUser(User : user): Observable<any> {
    return this.http.post<any>(this.UrlRegister,User);
  }
  public login(log : Object): Observable<any>{
    return this.http.post<any>(this.UrlLogin,log);
  }
  public getUserById(id : number): Observable<any>{
    return this.http.get<any>("http://localhost:3000/user/profile/"+id);
  }
  public getAllUsers():Observable<any>{
    return this.http.get<any>("http://localhost:3000/user/users");
  }
  public AssignUserToProject(obj : any):Observable<any>{
    return this.http.post<any>("http://localhost:3000/task/projects/assign-member",obj);
  }
  public getTeamCollabsByProject(id : number):Observable<any>{
    return this.http.get<any>("http://localhost:3000/project/projects/team/"+id);
  }


  ///////////////// COMPANY ////////////////////////////////
  public getCompanyById(id : number): Observable<any>{
    return this.http.get<any>("http://localhost:3000/company/companies/"+id);
  }
  public getAllCompanies():Observable<any>{
    return this.http.get<any>("http://localhost:3000/company/companies");
  }


  //////////////// PROJECT /////////////////////////////////
  public getProjectById(id: number):Observable<any>{
    return this.http.get<any>(this.BaseUrl+"/project/projects/"+id);
  }
  public getAllProjects():Observable<any>{
    return this.http.get<any>(this.BaseUrl+"/project/projects");
  }
  public getProjectMembers(id:number):Observable<any>{
    return this.http.get<any>(this.BaseUrl+"/project/projects/team/"+id);
  }
  public addProject(project : any):Observable<any>{
    return this.http.post<any>(this.BaseUrl+"/project/projects",project);
  }
  public deleteProject(id: number ):Observable<any>{
    return this.http.delete<any>(this.BaseUrl+"/project/projects/delete/"+id);
  }
  public updateProject(id:number,project : any):Observable<any>{
    return this.http.post<any>(this.BaseUrl+"/project/projects/update/:id",project);
  }


  ////////////////// TASKS ////////////////////////////////////
  public getTaskByProject(id: string):Observable<any>{
    return this.http.get<any>(this.BaseUrl+"/task/"+id+"/tasks");
  }
  public addTask(task:any):Observable<any>{
    return this.http.post<any>(this.BaseUrl+"/task/tasks",task);
  }
  public updateTask(task:any):Observable<any>{
    return this.http.put<any>(this.BaseUrl+"/task/update/",task);
  }
  public deleteTask(id:number):Observable<any>{
    return this.http.delete<any>(this.BaseUrl+"/task/tasks/delete/"+id);
  }
  public AssignMemberToTask(id:number,obj:any):Observable<any>{
    return this.http.post<any>(this.BaseUrl+"/task/tasks/"+id+"/assign-member",obj);
  }
}

