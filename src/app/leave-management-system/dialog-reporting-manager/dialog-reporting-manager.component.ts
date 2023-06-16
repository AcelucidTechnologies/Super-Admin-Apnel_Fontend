import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../_services/cms.service'
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/_services/leave.service';

@Component({
  selector: 'app-dialog-reporting-manager',
  templateUrl: './dialog-reporting-manager.component.html',
  styleUrls: ['./dialog-reporting-manager.component.scss']
})
export class DialogReportingManagerComponent {
  selectForm: FormGroup;
  payload:any
  pageTitle:string
  pageLink:string
  page: any
  fgsType:any;
 constructor(private ngxLoader: NgxUiLoaderService,
  private leaveservice: LeaveService,
   private fb: FormBuilder,
   private toastr: ToastrMsgService,
   private CmsService: CmsService,
   public dialog: MatDialog,
   private route: Router) {
   this.selectForm = this.fb.group({
     username: localStorage.getItem("email"),
     reporting: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z\s]+$/)]],
   });
}
 ngOnInit(): void {
   this.fgsType = SPINNER.squareLoader
   this.ngxLoader.start();
   this.ngxLoader.stop();
 }

 submitForm(){
 this.ngxLoader.start();
 this.leaveservice.createReport(this.selectForm.value).subscribe((res)=>{
   this.page= res;
      if (res) {
       this.ngxLoader.start();
        location.reload()
        this.toastr.showSuccess("Report maanger added successfully", "soruce hiring Added")
      }
      (error: any) => {
       console.log("error");
       this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop();
      }
 })
//  this.route.navigate(['/leaveMgmt/edit-profile']);

  }


}
