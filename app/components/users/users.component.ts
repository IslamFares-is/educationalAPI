import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit ,OnInit{
  [x: string]: any;
  constructor(private builder: FormBuilder, private service: AuthService, private toastr:ToastrService) {
    this.LoadUser();
  
  }
  userlist: any;
  dataSource: any;
  students:any[]=[]
  ActivatedCourses:[]=[]

 AllStudents:any[]=[]


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

this.getActivatedCourses()


  }

  
  LoadUser() {
    this.service.RequestForActivateCourseData().subscribe((res:any)=>{
      console.log(res)
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['id','userId', 'name', 'email','activateCourse', 'courseId',  'action'];


 /* updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }
/*
  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    /*
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
*/
ActivateCourse(element:any){

  console.log(element)
  console.log(this.userlist[element].courseId)
  console.log(this.userlist[element].id)
  this.userlist[element].isActiveCourse = true

  console.log( this.userlist[element])
  this.service.updateRequestForActivateCourse(this.userlist[element].id, this.userlist[element]).subscribe((res:any)=>{
    console.log(res)
  })
this.service.ActivateCourse(this.userlist[element]).subscribe((res:any)=>{
console.log(res)


})
this.toastr.success("تم تفعيل الكورس بنجاح ","",{
  disableTimeOut:false,
  titleClass:"toastr_title",
  messageClass:"toastr_message",
  timeOut:5000,
  closeButton:true
})

}
CancelActivateCourse(element:any){

  console.log(element)
  console.log(this.userlist[element].courseId)
  console.log(this.userlist[element].id)
  this.userlist[element].isActiveCourse = false
  console.log(this.userlist[element])
  this.service.updateRequestForActivateCourse(this.userlist[element].id, this.userlist[element]).subscribe((res:any)=>{
    console.log(res)
  })

this.service.CancelActivateCourse(this.userlist[element].id).subscribe((res:any)=>{
  console.log(res)

})
this.toastr.success("تم  الغاء تفعيل الكورس بنجاح ","",{
  disableTimeOut:false,
  titleClass:"toastr_title",
  messageClass:"toastr_message",
  timeOut:5000,
  closeButton:true
})
}
getActivatedCourse(id:any){
this.service.getCourseById(id).subscribe((res:any)=>{
  console.log(res)
})
}
getActivatedCourses(){
  this.service.getActivatedCourses().subscribe((res:any)=>{
    this.ActivatedCourses = res
    console.log(this.ActivatedCourses)
  })
}




}
