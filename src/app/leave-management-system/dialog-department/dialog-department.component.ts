import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../_services/cms.service'
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/_services/leave.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dialog-department',
  templateUrl: './dialog-department.component.html',
  styleUrls: ['./dialog-department.component.scss']
})
export class DialogDepartmentComponent {
  selectForm: FormGroup;
  payload:any
  pageTitle:string
  pageLink:string
  page: any
  fgsType:any;
  departmentdrop:any;
  departmentList:any;
 constructor(private ngxLoader: NgxUiLoaderService,
   private fb: FormBuilder,
   private leaveservice: LeaveService,
   private toastr: ToastrMsgService,
   public dialog: MatDialog) {
   this.selectForm = this.fb.group({
     username: localStorage.getItem("email"),
     department: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z\s]+$/)]],

   });
   this.selectForm.get('department').valueChanges.subscribe((value) => {
    this.checkdepartmentValidity(value);
  });
}
 ngOnInit(): void {

   this.fgsType = SPINNER.squareLoader
   this.ngxLoader.start();
   this.ngxLoader.stop();
   this.getDepartment()
 }

 submitForm(){
 this.ngxLoader.start();
 this.leaveservice.createdepartment(this.selectForm.value).subscribe((res)=>{
   this.page= res;
      if (res) {
       this.ngxLoader.start();
        // location.reload()
        this.getDepartment()
        this.toastr.showSuccess("Department added successfully", "Department Added")
      }
      (error: any) => {
       console.log("error");
       this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop();
      }
 })
  }

  checkdepartmentValidity(enteredDepartment: string): void {
    if (this.departmentList.includes(enteredDepartment)) {
      this.toastr.showError('Department already exists!', 'Error');
    }
  }


  getDepartment() {
    this.leaveservice.getdepartmentList().pipe(
      map((res) => res.map((profile) => profile.department))
    ).subscribe((departmentList) => {
      this.departmentList = [];
      this.departmentList = departmentList;
      console.log("department List:", this.departmentList);
      this.ngxLoader.stop();
    });
  }

}
