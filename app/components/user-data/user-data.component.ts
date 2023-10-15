import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {


  [x: string]: any;
  constructor(private builder: FormBuilder, private service: AuthService, private toastr:ToastrService) {
    this.getAllUsers()

  }
  userlist: any;
  dataSource: any;
  students:any[]=[]


 AllStudents:any[]=[]


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }

 
  displayedStudentsColumns: string[] = ['userId', 'name', 'email','Studentphone', 'Parentphone'];

  getAllUsers(){
    this.service.getStudents().subscribe((res:any)=>{
      this.AllStudents = res
      console.log(this.AllStudents)
    
        this.dataSource = new MatTableDataSource(this.AllStudents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  
}
