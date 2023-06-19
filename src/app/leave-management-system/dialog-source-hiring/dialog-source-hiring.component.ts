import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../_services/cms.service'
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/_services/leave.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dialog-source-hiring',
  templateUrl: './dialog-source-hiring.component.html',
  styleUrls: ['./dialog-source-hiring.component.scss']
})
export class DialogSourceHiringComponent {
  selectForm: FormGroup;
  payload:any
  pageTitle:string
  pageLink:string
  page: any
  fgsType:any;
  hiringList:any;
 constructor(private ngxLoader: NgxUiLoaderService,
   private fb: FormBuilder,
   private toastr: ToastrMsgService,
   private CmsService: CmsService,
   public dialog: MatDialog,
   private leaveservice: LeaveService,
   private route: Router) {
   this.selectForm = this.fb.group({
     username: localStorage.getItem("email"),
     sourceHiring: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
   });
   this.selectForm.get('sourceHiring').valueChanges.subscribe((value) => {
    this.checkHiringValidity(value);
  });
}
 ngOnInit(): void {
   this.fgsType = SPINNER.squareLoader
   this.ngxLoader.start();
   this.ngxLoader.stop();
   this.getReportingmanager()
 }

 submitForm(){
 this.ngxLoader.start();

 this.leaveservice.createSourceHiring(this.selectForm.value).subscribe((res)=>{
   this.page= res;
   console.log("source hiring data 107===>"+this.page)
      if (res) {
       this.ngxLoader.start();
        location.reload()
        this.toastr.showSuccess("Source Hiring added successfully", "Source Hiring Added")
      }
      (error: any) => {
       console.log("error");
       this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop();
      }
 })
//  this.route.navigate(['/leaveMgmt/edit-profile']);

  }
  checkHiringValidity(enteredreport: string): void {
    if (this.hiringList.includes(enteredreport)) {
      this.toastr.showError('Source Hiring already exists!', 'Error');
    }
  }

  getReportingmanager() {
      this.leaveservice.getSourceHiringList().pipe(
        map((res) => res.map((profile) => profile.sourceHiring))
      ).subscribe((res) => {
        this.hiringList = res;
        this.ngxLoader.stop();
      });
    }
}
