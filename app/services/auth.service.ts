import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  apiGlobal ="https://madrasaonline.onrender.com/"
  apiLocal ="http://localhost:3000/"
  private srcSubject = new Subject<string>();
  user = new Subject<any>(); 

   constructor(private http:HttpClient ,private router:Router) {

   }
  createUser(model:any):Observable<any> {
    return this.http.post(this.apiGlobal+"students" , model)
  }
  getUserByCode(type:string):Observable<any> {
    return this.http.get(this.apiGlobal+type)
  }
  getStudents():Observable<any>  {
    return this.http.get(this.apiGlobal+"students")
  } 
  login(model:any):Observable<any> {
    return this.http.post(this.apiGlobal+"login",model)
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getUsersLoggin():Observable<any>{
    return this.http.get(this.apiGlobal+"login")
    
  }
  deleteLoginUser(id:any):Observable<any>{
    return this.http.delete(this.apiGlobal+"login/"+id)

  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

  /// all about courses//////////////////////////////////////////


  createCourse(courseData:any):Observable<any>{
    return this.http.post(this.apiGlobal+"courses",courseData)
  }
  getAllCourses():Observable<any>{

  return this.http.get(this.apiGlobal+"courses")
}
deleteCourseById(id:any):Observable<any>{
  return this.http.delete(this.apiGlobal+"courses/"+id)
}
getCourseById(id:any):Observable<any>{

  return this.http.get(this.apiGlobal+"courses/"+id)
}
updateCourse(id:any,model:any):Observable<any>{
  return this.http.put(this.apiGlobal+"courses/"+id,model);
}
RequestForActivateCourse(model:any):Observable<any>{
return this.http.post(this.apiGlobal+"activationRequests",model)
}
updateRequestForActivateCourse(id:any,model:any):Observable<any>{
  return this.http.put(this.apiGlobal+"activationRequests/"+id,model)
  }
  deleteActivationRequest(id:any):Observable<any>{
    return this.http.delete(this.apiGlobal+"activationRequests/"+id)
    }
RequestForActivateCourseData():Observable<any>{
  return this.http.get(this.apiGlobal+"activationRequests")
  }
  ActivateCourse(model:any):Observable<any>{
    return this.http.post(this.apiGlobal+"ActivatedCourses",model)
  }
  CancelActivateCourse(id:any):Observable<any>{
    return this.http.delete(this.apiGlobal+"ActivatedCourses/"+id)
  }

  getActivatedCourses():Observable<any>{
    return this.http.get(this.apiGlobal+"ActivatedCourses")
  }
//////
changeSrc(incomingSrc:any) {
  this.srcSubject.next(incomingSrc);
}
}
