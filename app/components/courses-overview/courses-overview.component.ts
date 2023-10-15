import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.css']
})
export class CoursesOverviewComponent implements OnInit {
coursesList:any[]=[]
courseId:any
coursesIds:any[]=[]
currentUser={}
ActivatedCourses: any[]=[]
courses: any[]=[]
data:any
currentUserID :any
currentRole:any
ActivationRequests :any[] = []
showBtnSubscribe:boolean = false
coursesSubscriptionIndex:any []=[]
isAdmin:boolean = false

@Input() dataOfCourse:any={}
  constructor(private authservive:AuthService,private toastr:ToastrService){
    this.currentUserID = sessionStorage.getItem("userId")
    this.currentRole = sessionStorage.getItem("role")
    console.log(this.currentUserID)
    console.log(this.currentRole)

    if (sessionStorage.getItem("role") == 'professor'){
     this.isAdmin = true
   
    }
    else {
      this.isAdmin = false
    }
   this.authservive.getAllCourses().subscribe((result:any)=>{
   this.coursesList = result
  console.log(this.coursesList)


})
this.getActivationRequest()

this.getActivatedCourses()


  }


  ngOnInit(): void {
    this.coursesAlreadyActivated()
  }
  


  coursesAlreadyActivated(){
    this.authservive.getAllCourses().subscribe((res:any)=>{
      this.coursesList = res
      console.log(this.coursesList)

    
        console.log(this.coursesIds)
console.log(this.ActivatedCourses.length)
 for(let i=0 ;i<this.coursesList.length;i++){
  let currentacourseID = this.coursesList[i].id
  let index :any = this.ActivatedCourses.findIndex(item=>item.courseId == currentacourseID && item.email == sessionStorage.getItem('email'))
  console.log("index"+index)

  if(index !== -1){
    console.log("course already exist")
  }
  else {
    console.log("course is not  exist")
  }
  this.coursesSubscriptionIndex.push(index)


 }
console.log(this.coursesSubscriptionIndex)
})
  }

  getActivationRequest(){
    this.authservive.RequestForActivateCourseData().subscribe((res:any)=>{
      this.ActivationRequests = res
      console.log(this.ActivationRequests)
    })
  }



  courseSubscription(index:any){

    this.getActivationRequest()
    console.log(this.currentUserID)
     console.log(this.currentRole)
   console.log(this.coursesList[index])

   
   let currentCourseId  = this.coursesList[index].id
   let currentUserLoginned = this.currentUserID
   console.log(currentUserLoginned)

      let indexCourse = this.ActivationRequests.findIndex(item=>item.courseId == currentCourseId && item.userId == currentUserLoginned)
    console.log(indexCourse)

    if(indexCourse !== -1){
      this.toastr.error("  تم ارسال طلبك الي من قبل الرجايء التواصل مع المسئول","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true
      })
    }
    else{
      this.currentUser = {
        name:sessionStorage.getItem('username'),
        email:sessionStorage.getItem('email'),
        userId:sessionStorage.getItem('userId'),
        courseId : currentCourseId,
        isActiveCourse:false
      }
      console.log(this.currentUser)
      
this.authservive.RequestForActivateCourse(this.currentUser).subscribe((res:any)=>{
  console.log(res)
})
this.toastr.success("تم   ارسال طلب الاشتراك في  الكورس بنجاح ","",{
  disableTimeOut:false,
  titleClass:"toastr_title",
  messageClass:"toastr_message",
  timeOut:5000,
  closeButton:true
})

  
    }
    
      
    

  }
  requestActiveCourse(index:any){

    console.log(this.coursesList[index])
    console.log(index)

    console.log(this.courseId)
    this.currentUser = {
      name:sessionStorage.getItem('username'),
      email:sessionStorage.getItem('email'),
      userId:sessionStorage.getItem('userId'),
      courseId : this.courseId,
      isActiveCourse:false
    }
    console.log(this.currentUser)

    //send request

this.authservive.RequestForActivateCourse(this.currentUser).subscribe((res:any)=>{
      console.log(res)
    })
    this.toastr.success("تم   ارسال طلب الاشتراك في  الكورس بنجاح ","",{
      disableTimeOut:false,
      titleClass:"toastr_title",
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })

  }


  getActivatedCourses(){
    this.authservive.getActivatedCourses().subscribe((res:any)=>{
      this.ActivatedCourses = res
      console.log(this.ActivatedCourses)
      this.activatedCoursesData()
      this.coursesAlreadyActivated()
    })

  }

  activatedCoursesData(){

    if (this.currentRole == "professor"){
      this.authservive.getAllCourses().subscribe((res:any)=>{
        this.courses = res
      })
 

    }
    else{
      console.log(this.ActivatedCourses)

for (let i =0 ; i< this.ActivatedCourses.length ; i++ ){
   console.log(this.ActivatedCourses[i]['courseId'])
   if(this.ActivatedCourses[i]['userId'] == this.currentUserID && this.ActivatedCourses[i]['email'] == sessionStorage.getItem('email')){
    console.log("yes")
    console.log(this.ActivatedCourses[i]['userId'])
    this.coursesIds.push(this.ActivatedCourses[i]['courseId'])
   }
   else {
    console.log("no")
   }


}
console.log(this.coursesIds)
for (let i=0 ;i<this.coursesIds.length;i++){
  this.authservive.getCourseById(this.coursesIds[i]).subscribe((res:any)=>{
   this.courses.push(res)

  })

}
console.log(this.courses)

}
    }




}
