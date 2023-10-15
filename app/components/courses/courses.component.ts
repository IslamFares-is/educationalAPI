import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent  implements OnInit{

  AllCourses:any[]=[]

  constructor(private authService:AuthService){
    this.getAllCourses()
  }
   ngOnInit():void{
   this.getAllCourses()
}
  getAllCourses(){
    this.authService.getAllCourses().subscribe(result=>{
      this.AllCourses=result
      console.log(this.AllCourses)
    })
  }

}
