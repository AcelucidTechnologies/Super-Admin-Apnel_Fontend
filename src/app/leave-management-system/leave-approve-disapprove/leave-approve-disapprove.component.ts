import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-leave-approve-disapprove',
  templateUrl: './leave-approve-disapprove.component.html',
  styleUrls: ['./leave-approve-disapprove.component.scss']
})
export class LeaveApproveDisapproveComponent {
  type: any;
  leaveType:any;
  appliedToType:any;
  selectForm: FormGroup;
  leaveList:any
  id:string ='64820460ad46b42ae9019539'
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
   this.getLeaveListById()

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

getLeaveListById(){
  this.leaveservice.getLeaveById(this.id).subscribe((res)=>{
    this.leaveList = res;
    const fromDate = this.convertDateFormat(res.fromDate);
    const toDate = this.convertDateFormat(res.toDate);
    console.log("leave list by id ===>"+JSON.stringify(res));
    this.selectForm.patchValue({
      leaveType: res.leaveType,
      fromDate: fromDate,
      toDate: toDate,
      contactNo:res.contactNo,
      altConatctNo: res.altConatctNo,
      reason: res.reason,
      image: res.image,
      appliedTo: res.appliedTo,
    });
  });
  console.log("after patched value ==>"+ this.selectForm.value)
}
convertDateFormat(apiDate: string): string {
  if (!apiDate) {
    return ''; // or return a default value if desired
  }

  const date = new Date(apiDate);
  const year = date.getUTCFullYear();
  const month = this.formatNumber(date.getUTCMonth() + 1);
  const day = this.formatNumber(date.getUTCDate());
  return `${year}-${month}-${day}`;
  // return `${month}/${date}/${year}`;
}

formatNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}




  submit(){


  }

}
