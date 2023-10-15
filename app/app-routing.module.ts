import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { UserDataComponent } from './components/user-data/user-data.component';


const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'users-data',component:UserDataComponent,canActivate:[AuthGuard]},
  {path:'courses',component:CoursesComponent,canActivate:[AuthGuard]},
  {path:'add-course',component:AddCourseComponent,canActivate:[AuthGuard]},
  {path:'details/:id',component:CourseDetailsComponent},
    {path:'',redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
