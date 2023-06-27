import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-exit',
  templateUrl: './add-exit.component.html',
  styleUrls: ['./add-exit.component.scss']
})
export class AddExitComponent {
  selectForm: FormGroup;
  exitlist:any;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {

    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      employeeId:['', [Validators.required] ],
      employeeName: ['',[Validators.required] ],
      interviewerType: ['',[Validators.required, ]],
      reasonForLeaving: ['',[Validators.required, ]],
      workingOrganization: ['',[Validators.required]],
      mostTheCompany: ['',[Validators.required]],
      improveStaffWelfare: ['', [Validators.required]],
      anythingShare: ['', [Validators.required]],
      allAssets: ['',[Validators.required]],
      noticePeriod:['',[Validators.required]],
      manager:['',[Validators.required]],
      addedBy:['',[Validators.required]],


    });


 }


submit(){
  this.ngxLoader.start();
  this.leaveservice.createExit(this.selectForm.value).subscribe((res)=>{
    this.exitlist= res;
    console.log("100" + this.exitlist)
       if (res) {
        this.ngxLoader.start();

         this.toastr.showSuccess("Exit Details added successfully", "Details Added")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }
       this.route.navigate(['/exitmgmt/exit-list']);

       console.log("245 ==>"+ JSON.stringify(this.selectForm.value))

  })

   }


}
