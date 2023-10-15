import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements  OnInit  ,DoCheck{
  isadmin=false;

  isLoginMode = false
  
  userLogined:any

  isMenuRequired=false
  username:any
user:any
  constructor(private authService:AuthService,private router:Router){
   
      let role = sessionStorage.getItem('role');
      let name = sessionStorage.getItem('username');
   
     this.username = name
     if(this.authService.getrole()){
      this.isLoginMode = true
    }
    else{
      this.isLoginMode = false
    
    }
        

  }

  ngOnInit(): void {

  
    /*
    this.authService.user.subscribe((res:any)=>{
      if(res.role){
        this.user = res
        this.username = res.username
         console.log(this.user.username)
   
      }
      

    })
 */
    

  }


  ngDoCheck(): void {
    let currentUrl = this.router.url;
    let role = sessionStorage.getItem('role');
    if (currentUrl== '/login' || currentUrl =='/register') {
      this.isMenuRequired = false
    } else {
      this.isMenuRequired = true
    }

    if (this.authService.getrole() == 'professor') {
      this.isadmin = true;
      this.isLoginMode =true
      this.username = sessionStorage.getItem("username")
    }else{
      this.isadmin = false;
    }
  
    if (this.authService.getrole() == 'students') {
      this.isLoginMode =true
      this.username = sessionStorage.getItem("username")

    }
        
  
  }


  logout(){
   
    const model = {}
   this.authService.login(model).subscribe(res=>{
    this.user = null
    this.authService.user.next(res)
    this.router.navigate(['/login'])

  })
this.isLoginMode = false
  
  }



}
