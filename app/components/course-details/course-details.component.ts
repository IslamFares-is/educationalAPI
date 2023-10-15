import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent  implements OnInit{
  id:any
  status: boolean = false;
  dropDown:boolean =false;
  data:any={}
  title:any
  courseDescription:any
  typeOfYear:any
  coursePrice:any
  courseImage:any
  sections:any
  newLessons:any
  link= 'https://www.youtube.com/embed/ITHOju1mkYE?si=nu7AIMBiYjRc1Jdm';
  urlSafe!: SafeResourceUrl;
  formModal: any;
  formModalA:any
  formModalB:any
  CurrentsectionName = ''
  sectionIndex:any
  lessonIndex:any
  newsectionName:any
  newSectionModel:any
  sectionUpdated:any
  currentSection:any
  editSectionForm!:FormGroup
  newLesson:any
  recipeForm!:FormGroup
  LessonType:any
  LessonTitle:any
  LessonLink:any
  LessonFile:any
  currentIndexOfSection:any
  currentLessons:any
  displaySectionStyle = "none";
  displayAddSectionStyle = "none";
  displayLessoonStyle = "none";
  displayAddLessonStyle = "none";
  displaycourseDeatailsStyle ="none"
  displayConfirmationDeleteSection ="none"
  displayConfirmationDeleteLesson="none"
  stepperIndex = 0;
  startAdd:boolean = false
  preview:boolean = false
  name = new FormControl("");
  lessons:any[] = [];
  lessionForm!:FormGroup
  AddCourseForm!:FormGroup
  selectedFile:any
  selectedCourseData:any
  lessonsCount = 0
  currentUser:any
  isAdmin = false
  defaultCourseVedio:any
  closeResult = ''; 
  firstLessonCourse :any;
  sectionOfCurrentCourse:[]=[];
  imageForCourse:any;
  lessonFrame: any;
  del_course_alert:boolean = false; 
  del_section_alert:boolean = false; 
  del_lesson_alert:boolean = false; 

indexFirstLesson = 0
  constructor( private route:ActivatedRoute ,private authservice:AuthService,private sanitizer: DomSanitizer,private fb:FormBuilder,private toastr:ToastrService ,private router:Router){
    this.id = this.route.snapshot.paramMap.get("id")
    this.currentUser = sessionStorage.getItem("role")
    if(this.currentUser == "professor"){
      this.isAdmin = true
    }

this.initForm()
this.createFormLessons()

this.getCourse();
this.getLenthLesson()

  }
  ngOnInit(): void {
  this.authservice.getCourseById(this.id).subscribe((res:any)=>{
     this.firstLessonCourse  = res.sections[0].lessions[0].LessonLink
     this.imageForCourse = res.courseImage
  })
  
  //  this.firstLessonCourse = this.sections[this.indexFirstLesson].lessions[this.indexFirstLesson].LessonLink

  }

  onFileSelected(event:any){
    
   
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.selectedFile = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);


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
    this.lessionForm.reset()
  }

  createSections(){

    const model = {
   name:this.name.value,
   lessions:this.lessons
  }


this.sections.push(model)
const newModel={
  courseName:this.title,
  courseDescription:this.courseDescription,
  typeOfYear:this.typeOfYear,
  coursePrice:this.coursePrice,
  courseImage:this.courseImage,
  sections:this.sections
  }
  this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
  this.toastr.success("تم اضافة قسم جديد بنجاح")
  })
  this.closePopupAddSection()
this.lessons = []

}

deleteSection(index:any){
  this.sections.splice(index,1)
  const newModel={
    courseName:this.title,
    courseDescription:this.courseDescription,
    typeOfYear:this.typeOfYear,
    coursePrice:this.coursePrice,
    courseImage:this.courseImage,
    sections:this.sections
    }
    this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
    this.toastr.success("تم    حذف السيكشن بنجاح")
    })
}
deleteLessonection(indexLesson:any,indexSection:any){
 this.sections[indexSection].lessions.splice(indexLesson,1)
 const newModel={
  courseName:this.title,
  courseDescription:this.courseDescription,
  typeOfYear:this.typeOfYear,
  coursePrice:this.coursePrice,
  courseImage:this.courseImage,
  sections:this.sections
  }
  this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
  this.toastr.success("تم    حذف الدرس بنجاح")
  })



}
addLesons(index:any){
  this.openPopupAddLesson()
this.sectionIndex = index

}
saveLessonToSection(){
  const model = {
    lessonType:this.lessionForm.value.lessonType,
    lessonsTitle:this.lessionForm.value.lessonsTitle,
    LessonLink:this.lessionForm.value.LessonLink,
    lessonFile:this.lessionForm.value.lessonFile,
  }

  this.sections[this.sectionIndex].lessions.push(model)
const newModel={
  courseName:this.title,
  courseDescription:this.courseDescription,
  typeOfYear:this.typeOfYear,
  coursePrice:this.coursePrice,
  courseImage:this.courseImage,
  sections:this.sections
  }
  this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
  this.toastr.success("تم    اضافة   الدرس بنجاح")
  })


this.lessionForm.reset()



}
// edit course data 
editCourseData(){
  this.openPopupcourseDetails()
  this.authservice.getCourseById(this.id).subscribe((res:any)=>{
    this.selectedCourseData = res
      this.title = this.selectedCourseData.courseName
      this.courseDescription = this.selectedCourseData.courseDescription
      this.coursePrice =this.selectedCourseData.coursePrice 
      this.typeOfYear = this.selectedCourseData.typeOfYear
      this.courseImage = this.selectedCourseData.courseImage
  })
this.initForm()
 
}

// save course data 
saveUpdatedCourseData(){
  const newModel={
    courseName:this.AddCourseForm.value.courseName,
    courseDescription:this.AddCourseForm.value.courseDescription,
    typeOfYear:this.AddCourseForm.value.typeOfYear,
    coursePrice:this.AddCourseForm.value.coursePrice,
    courseImage:this.AddCourseForm.value.courseImage,
    sections:this.sections
    }
   this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
   this.toastr.success("تم    تعديل بيانات الكورس بنجاح")
   })
   this.closePopupcourseDetails()
}

openConfirmationdeleteSection(){
  
  this.displayConfirmationDeleteSection ="block"
  this.closePopupLesson()
  this.closePopupAddSection()
  this.closePopupAddLesson()
  this.closePopupSection()
  this.closeConfirmationdeleteLesson()
}
closeConfirmationdeleteSection(){
  this.displayConfirmationDeleteSection ="none"
}
openConfirmationdeleteLesson(){
  this.displayConfirmationDeleteLesson ="block"
  this.closePopupLesson()
  this.closePopupAddSection()
  this.closePopupAddLesson()
  this.closePopupSection()
  this.closeConfirmationdeleteSection()
}
closeConfirmationdeleteLesson(){
  this.displayConfirmationDeleteLesson ="none"
}
  openPopupSection() {
    this.displaySectionStyle = "block";
    this.closePopupLesson()
    this.closePopupAddSection()
    this.closePopupAddLesson()
    this.closeConfirmationdeleteLesson()
    this.closeConfirmationdeleteSection()
   this.closePopupcourseDetails()


  }
  openPopupcourseDetails(){
    this.displaycourseDeatailsStyle ="block"
    this.closePopupSection()
    this.closePopupLesson()
    this.closePopupAddSection()
    this.closePopupAddLesson()
    this.closeConfirmationdeleteLesson()
    this.closeConfirmationdeleteSection()
   



  }
  closePopupcourseDetails(){
    this.displaycourseDeatailsStyle ="none"
  }

  openPopupAddLesson() {
    this.displayAddLessonStyle = "block";
    this.closePopupAddSection()
    this.closePopupLesson()
    this.closePopupAddSection()
    this.closePopupcourseDetails()
    this.closeConfirmationdeleteLesson()
    this.closeConfirmationdeleteSection()



  }
  openPopupAddSection() {
    this.displayAddSectionStyle = "block";
  this.closePopupLesson()
  this.closePopupSection()
  this.closePopupAddLesson()
  this.closePopupcourseDetails()
  this.closeConfirmationdeleteLesson()
  this.closeConfirmationdeleteSection()
 


  }
  openPopupLesson(){
    this.displayLessoonStyle = "block";
    this.closePopupSection()
    this.closePopupAddSection()
    this.closePopupcourseDetails()
    this.closeConfirmationdeleteLesson()
    this.closeConfirmationdeleteSection()


  }
  closePopupSection() {
    this.displaySectionStyle = "none";
  }
  closePopupAddSection() {
    this.displayAddSectionStyle = "none";
  }
  closePopupLesson() {
    this.displayLessoonStyle = "none";
  }
  closePopupAddLesson() {
    this.displayAddLessonStyle = "none";
  }
  clickEvent(){
      this.status = !this.status;
      this.dropDown =!this.dropDown
  }
  changUrlVedio(url:any){
    // this.lessonFrame = url.slice(38,79);
    // console.log(this.lessonFrame)
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url.slice(38,79));
  }

addSection(){
  this.openPopupAddSection()
    }
editSectionName(indexSection:any){
  this.openPopupSection()

  this.sectionIndex = indexSection
  this.currentSection =this.sections[indexSection]
  this.CurrentsectionName = this.sections[indexSection].name
  this.currentLessons= this.sections[indexSection].lessions

  this.initForm()
}
  getCourse(){
    this.authservice.getCourseById(this.id).subscribe((res:any)=>{
     this.title = res.courseName
     this.courseDescription = res.courseDescription
     this.coursePrice =res.coursePrice
     this.courseImage = res.courseImage
     this.typeOfYear = res.typeOfYear
     this.data = res
     this.sections = res.sections
    })
    this.getLenthLesson()

   
  }



  getLenthLesson(){
  }




 private initForm(){
    let name='';
    let Ltype =''
    let Ltitle =''
    let Llink=''
    let Lfile = ''
    let title =''
    let  courseDescription = ''
    let typeOfYear =''
    let coursePrice =''
    let courseImage = ''

      name= this.CurrentsectionName;
      Ltype = this.LessonType
      Ltitle = this.LessonTitle
      Llink = this.LessonLink
      Lfile =this.LessonFile
       
      title = this.title
      courseDescription = this.courseDescription
      typeOfYear = this.typeOfYear
      coursePrice = this.coursePrice
      courseImage = this.courseImage


        this.editSectionForm = new FormGroup({
          'name':new FormControl(name,Validators.required),
          'Ltype':new FormControl(Ltype,[Validators.required]),
          'Ltitle':new FormControl(Ltitle,[Validators.required]),
          'Llink':new FormControl(Llink,[Validators.required]),
          'Lfile':new FormControl(Lfile)


        })
        this.AddCourseForm = this.fb.group({
          'courseName': new FormControl(title,[Validators.required]),
          'courseDescription': new FormControl(courseDescription),
          'typeOfYear': new FormControl(typeOfYear,[Validators.required]),
          'coursePrice': new FormControl(coursePrice,[Validators.required]),
          'courseImage': new FormControl(courseImage,[Validators.required]),
      
        })
        



  }

      SAVESECTION(){
        const MOdel = {
          name:this.editSectionForm.value.name,
          lessions: this.currentLessons
        }
       this.currentSection = MOdel
       this.sections[this.sectionIndex] =  this.currentSection
     const newModel={
      courseName:this.title,
      courseDescription:this.courseDescription,
      typeOfYear:this.typeOfYear,
      coursePrice:this.coursePrice,
      courseImage:this.courseImage,
      sections:this.sections
    }
    this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
      this.toastr.success("تم تعديل بيانات الكورس بنجاح")
   })
        this.closePopupSection()
  }


      saveUpdatedLesson(){
        this.CurrentsectionName = this.sections[this.sectionIndex].name

      const modelLesson = {
        lessonType:this.editSectionForm.value.Ltype,
        lessonsTitle:this.editSectionForm.value.Ltitle,
        LessonLink:this.editSectionForm.value.Llink,
        lessonFile:this.editSectionForm.value.Lfile

      }
      this.sections[this.sectionIndex].lessions[this.lessonIndex] = modelLesson
      this.currentLessons = this.sections[this.sectionIndex].lessions
      const MOdelSection = {
        name:this.CurrentsectionName,
        lessions: this.currentLessons
      }
this.currentSection = MOdelSection
this.sections[this.sectionIndex] =  this.currentSection

const newModel={
courseName:this.title,
courseDescription:this.courseDescription,
typeOfYear:this.typeOfYear,
coursePrice:this.coursePrice,
courseImage:this.courseImage,
sections:this.sections
}
this.authservice.updateCourse(this.id,newModel).subscribe((res:any)=>{
this.toastr.success("تم تعديل بيانات الكورس بنجاح")
})
this.closePopupLesson()

    }



  saveCourse(){

    const newModel={
      courseName:this.title,
      courseDescription:this.courseDescription,
      typeOfYear:this.typeOfYear,
      coursePrice:this.coursePrice,
      courseImage:this.courseImage,
      sections:this.sections
    }
this.authservice.updateCourse(1,newModel).subscribe((res:any)=>{
  this.toastr.success("تم تعديل بيانات الكورس بنجاح")
})

  }

  editLessons(lessonIndex:any ,sectionIndex:any){
    this.openPopupLesson()
    this.sectionIndex =sectionIndex
    this.lessonIndex = lessonIndex

    this.LessonTitle = this.sections[sectionIndex].lessions[lessonIndex].lessonsTitle
    this.LessonType =  this.sections[sectionIndex].lessions[lessonIndex].lessonType
    this.LessonLink = this.sections[sectionIndex].lessions[lessonIndex].LessonLink


    this.LessonFile = this.sections[sectionIndex].lessions[lessonIndex].lessonFile

    this.initForm()
  }

  // delete alerts -------------------------------------------
  delCourseAlert() {
    this.del_course_alert = !this.del_course_alert;
  }

  delSectionAlert() {
    this.del_section_alert = !this.del_section_alert;
  }
  delLessonAlert() {
    this.del_lesson_alert = !this.del_lesson_alert;
  }
  
  // End delete alerts -------------------------------------------


deleteCourse(){
  this.authservice.deleteCourseById(this.id).subscribe((res:any)=>{
    this.toastr.success("تم حذف بيانات الكورس بنجاح")

  })
  this.router.navigate([''])
}



}
