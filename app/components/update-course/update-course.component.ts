
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent {
  name = new FormControl("");
  editCourseForm!:FormGroup
  lessionForm!:FormGroup;
  sections:any[]=[]
  lessons:any[] = [];
  correctNum:any;
  subjectName:any = "";
  stepperIndex = 0;
  startAdd:boolean = false
  preview:boolean = false
  id:any;
  AllCoursesData:any[]=[]
 selectedFile:any
 finalSaveCourse:boolean=false
  editData:any
  constructor(private fb:FormBuilder,private authService:AuthService,private toaster:ToastrService){
    //this.createCouseForm()
    //this.createFormLessons();
    this.editForm()
    this.editLessons()
    this.loadCourseData()
  }
  loadCourseData(){
    this.authService.getCourseById(1).subscribe(res=>{
      this.editData =res
      console.log(this.editData)
    })}

  editForm(){
    this.editCourseForm = this.fb.group({
      courseName: new FormControl(this.editData.courseName,[Validators.required]),
      courseDescription: new FormControl(''),
      typeOfYear: new FormControl('',[Validators.required]),
      coursePrice: new FormControl('',[Validators.required]),
      courseImage: new FormControl('',[Validators.required]),
  })}
editLessons(){
  this.lessionForm = this.fb.group({
    lessonType: new FormControl('',[Validators.required]),
    lessonsTitle: new FormControl('',[Validators.required]),
    LessonLink: new FormControl('',[Validators.required]),
    lessonFile: new FormControl('',),
  })
}

}
  /*
  onFileSelected(event:any){
      var reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target)
          this.selectedFile = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  

  }
  ngOnInit(): void {


  }
  


  createCouseForm(){
    this.AddCourseForm = this.fb.group({
      courseName: new FormControl('',[Validators.required]),
      courseDescription: new FormControl(''),
      typeOfYear: new FormControl('',[Validators.required]),
      coursePrice: new FormControl('',[Validators.required]),
      courseImage: new FormControl('',[Validators.required]),
  
    })

  }

createFormLessons(){
  this.lessionForm = this.fb.group({
    lessonType: new FormControl('',[Validators.required]),
    lessonsTitle: new FormControl('',[Validators.required]),
    LessonLink: new FormControl('',[Validators.required]),
    lessonFile: new FormControl('',),
  })

}

createLessons(){
  const model = {
    lessonType:this.lessionForm.value.lessonType,
    lessonsTitle:this.lessionForm.value.lessonsTitle,
    LessonLink:this.lessionForm.value.LessonLink,
    lessonFile:this.lessionForm.value.lessonFile,
  }
  this.lessons.push(model)
  console.log(this.lessons)
  this.lessionForm.reset()
}

clearForm() {
  this.lessionForm.reset()
}

//
start() {
  if(this.name.value == "") {
    this.toaster.error("Enter Subject Name")
  }
  else {
    this.preview = true
    this.subjectName = this.name.value
  }

  if(this.preview) {
    this.stepperIndex = 1
  }
}

  next(){
    this.startAdd = true
    if(this.startAdd) {
      this.stepperIndex = 1
    }

  }


  //
  createSections(){
   
    const model = {
   name:this.subjectName,
   lessions:this.lessons
  }
console.log(model)
this.sections.push(model)
console.log(this.sections)
this.finalSaveCourse=true


}//
addNewSection(){
  this.lessons=[]

}

//
CreateCourse(){

  const model={
    courseName:this.AddCourseForm.value.courseName,
    courseDescription:this.AddCourseForm.value.courseDescription,
    typeOfYear:this.AddCourseForm.value.typeOfYear,
    coursePrice:this.AddCourseForm.value.coursePrice,
    courseImage:this.selectedFile,
    sections:this.sections
  }
   this.authService.createCourse(model).subscribe(result=>{
    this.AllCoursesData = result
     console.log(this.AllCoursesData)
     
   })
   this.toaster.success("تم اضافة بيانات الكورس بنجاح")
   this.finalSaveCourse=false


 }
 //
 */

