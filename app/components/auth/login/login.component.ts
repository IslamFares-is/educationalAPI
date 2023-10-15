import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  userLoginData:any
  users:any[]=[]
  type:string="students"
  result: any;
    constructor( private fb:FormBuilder, private authservice:AuthService,private router:Router,private toastr:ToastrService,private http:HttpClient) {
      sessionStorage.clear();

    }

  ngOnInit(): void {
    
    this.createForm()

this.getUser()
  }

  changeRole(event:any){
    this.type = event.value;
   this.getUser()
    console.log(this.type)
  }

  getUser(){
    this.authservice.getUserByCode(this.type).subscribe((res:any)=>{
      this.users = res
      console.log(this.users)
    })


  }




  createForm(){
      this.loginForm = this.fb.group({
       type:[this.type],
       Email:['',[Validators.required,Validators.email]],
       password:['',[Validators.required]],

    })
  }

  login(){
    let index = this.users.findIndex(item=> item.Email == this.loginForm.value.Email && item.password == this.loginForm.value.password)

    if(index == -1){
      this.toastr.error("الايميل او كلمة السر غير صحيحة","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true
      })
    }
    else{
      const model ={
        username:this.users[index].FirstName,
        role:this.type,
        userId:this.users[index].id,
        email:this.users[index].Email,
  
      }
  
      this.authservice.login(model).subscribe(res=>{
       this.authservice.user.next(res)
        console.log(res)
        console.log(res.isActive)
  
  
    this.toastr.success("تم تسجيل الدخول بنجاح ","",{
      disableTimeOut:false,
      titleClass:"toastr_title",
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })
    this.userLoginData = res
    sessionStorage.setItem('username',this.userLoginData.username);
    sessionStorage.setItem('role',this.userLoginData.role);
    sessionStorage.setItem('email',this.userLoginData.email);
    sessionStorage.setItem('userId',this.userLoginData.userId);
  
    this.router.navigate([''])
  
  
  
      })
  
    }
   
  }




}


/*
  let index = this.users.findIndex(item=> item.Email == this.loginForm.value.Email && item.password == this.loginForm.value.password)

  if(index == -1){
    this.toastr.error("الايميل او كلمة السر غير صحيحة","",{
      disableTimeOut:false,
      titleClass:"toastr_title",
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })
  }
  else{
    const model ={
      username:this.users[index].FirstName,
      role:this.type,
      userId:this.users[index].id,
      email:this.users[index].Email,

    }

    this.authservice.login(model).subscribe(res=>{
      this.authservice.user.next(res)
      console.log(res)
      console.log(res.isActive)


  this.toastr.success("تم تسجيل الدخول بنجاح ","",{
    disableTimeOut:false,
    titleClass:"toastr_title",
    messageClass:"toastr_message",
    timeOut:5000,
    closeButton:true
  })
  this.userLoginData = res
  sessionStorage.setItem('username',this.userLoginData.username);
  sessionStorage.setItem('role',this.userLoginData.role);
  sessionStorage.setItem('email',this.userLoginData.email);
  sessionStorage.setItem('userId',this.userLoginData.userId);
  this.router.navigate([''])



    })

  }

*/




    /*
const model ={
    username:this.users[0].FirstName,
    role:this.type,
    userId:this.users[0].id
  }
  console.log(model)
  let index = this.users.findIndex(item=> item.email == this.loginForm.value.email &&item.password == this.loginForm.value.password)
  if(index == -1){
    this.toastr.error("Email Or Password is incorrect","",{
      disableTimeOut:false,
      titleClass:"toastr_title",
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })
  }
  else{
    const model ={
      username:this.users[index].username,
      role:this.type,
      userId:this.users[index].id
    }
    this.authservice.login(this.loginForm.value).subscribe(res=>{
      this.authservice.user.next(res)
  this.toastr.success("Successfully Login ","",{
    disableTimeOut:false,
    titleClass:"toastr_title",
    messageClass:"toastr_message",
    timeOut:5000,
    closeButton:true
  })
  //this.router.navigate(['subjects'])

      console.log(res)
    })

  }

  */





