import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowProjectsComponent } from './show-projects/show-projects.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: 'login' , component:LoginComponent},
  { path: 'signup', component:SignUpComponent},
  { path: 'profile',component:ProfileComponent},
  { path:'projects',component:HomeComponent},
  { path:'projects/show/:id',component:ShowProjectsComponent},
  { path:'tasks/:id',component:TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
