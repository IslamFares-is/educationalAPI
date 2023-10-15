import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
 
  SignUpForm!:FormGroup

  students:any[]=[]
  constructor(private fb:FormBuilder,private toastr:ToastrService,private router :Router, private authservice:AuthService, private http:HttpClient){

  }
  ngOnInit(): void {
    this.createForm()
    this.authservice.getStudents().subscribe((res:any)=>{
      this.students = res
      console.log(this.students)
      console.log(this.students[0].Email)
    })

  }


createForm(){
  this.SignUpForm = this.fb.group({
    FirstName: new FormControl('',[Validators.required]),
    LastName: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required,Validators.email]),
    StudentPhoneNumber: new FormControl('',[Validators.required]),
    ParentStudentPhoneNumber: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    year: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirmPassword: new FormControl('',[Validators.required]),

  })
}



  onSubmit(){
  const modelUser=  {
      FirstName: this.SignUpForm.value.FirstName,
      LastName:this.SignUpForm.value.LastName,
      studentPhone:this.SignUpForm.value.StudentPhoneNumber,
      parentphone:this.SignUpForm.value.ParentStudentPhoneNumber,
      city:this.SignUpForm.value.city,
      year:this.SignUpForm.value.year,
      Email: this.SignUpForm.value.Email,
      password: this.SignUpForm.value.password
   
    }

    this.authservice.getStudents().subscribe((res:any)=>{
      this.students = res
    })
    let index = this.students.findIndex(item=> item.Email == modelUser.Email)
    console.log(index)
    if(index !== -1){
      this.toastr.error(" الايميل موجود بالفعل يمكنك تسجيل الدخول","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true
      })
    }
    else{
      this.authservice.createUser(modelUser).subscribe(res=>{
    this.toastr.success("تم انشاء الحساب بنجاح ","",{
      disableTimeOut:false,
      titleClass:"toastr_title",
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })
    this.router.navigate(['/login'])
       
        console.log(res)
        this.SignUpForm.reset()

      })
      
    }
    
  }
 
}
