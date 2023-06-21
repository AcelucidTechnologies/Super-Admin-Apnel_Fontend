import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss']
})
export class LeaveApplyComponent {
  type: any;
  leaveType:any;
  appliedToType:any;
  selectForm: FormGroup;
  page: any

  constructor(
    // private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      leaveType: ['',[Validators.required] ],
      fromDate: ['',[Validators.required]],
      toDate: ['',[Validators.required]],
      contactNo: ['',[Validators.required,  Validators.pattern(/^\d{10}$/)]],
      altConatctNo: ['',  [Validators.pattern(/^\d{10}$/)]],
      reason: ['', [Validators.required]],
      image: [''],
      appliedTo: ['',[Validators.required]],

    });

 }

  ngOnInit(): void {

    this.type = [
      'earned',
      'leaveWithoutpay',
      'sickLeave',
      'workFromHome',
      'compOff',
      'casualLeave',
    ];
    this.leaveType = [
      'earned',
      'leaveWithoutpay',
      'sickLeave',
      'workFromHome',
      'compOff',
      'casualLeave',
    ];
    this.appliedToType = [
      'Admin',
      'Mahender',
      'Shivam',

    ];
  }


  submit(){
    // this.ngxLoader.start();

    this.leaveservice.createLeave(this.selectForm.value).subscribe((res)=>{
      this.page= res;
      console.log("leave data 107===>"+this.page)
         if (res) {
          // this.ngxLoader.start();
           location.reload()
           this.toastr.showSuccess("Leave applied successfully", "Leave Applied")
         }
         (error: any) => {
          console.log("error");
          this.toastr.showError("Somthing wrong Please check", "Error occured")
          //  this.ngxLoader.stop();
         }
    })

     }

}
