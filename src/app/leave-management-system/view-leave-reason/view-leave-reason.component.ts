import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-view-leave-reason',
  templateUrl: './view-leave-reason.component.html',
  styleUrls: ['./view-leave-reason.component.scss']
})
export class ViewLeaveReasonComponent {

  type: any;
  id:any
  leaveType:any;
  appliedToType:any;
  emailList:any
  selectForm: FormGroup;
  page: any
  employeeList: any[]=[]
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private activatedRoute:ActivatedRoute,
    private route: Router) {
      this.activatedRoute.queryParamMap.subscribe(params => {
        this.id = params.get('id');
      })

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
      subject:['',[Validators.required]]

    });

 }

 getReasonById(){
  this.leaveservice.getLeaveTrackerById(this.id).subscribe((res)=>{
    const fromDate = this.convertDateFormat(res.fromDate);
    const toDate = this.convertDateFormat(res.toDate);
  this.selectForm.patchValue({
    leaveType:res.leaveType,
    fromDate:fromDate,
    toDate:toDate,
    contactNo:res.contactNo,
    altConatctNo:res.altConatctNo,
    reason:res.reason,
    appliedTo:res.appliedTo,
    subject:res.subject,
  })
  })
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
  getAllEmail() {
    this.leaveservice.getEmail().subscribe((res) => {
      this.employeeList =  res
      // this.employeeList  = res.map(employee => `${employee.employeeFullName} (${employee.email})`);
      this.ngxLoader.stop();
      console.log("email" + JSON.stringify(this.employeeList))
    });
  }


  ngOnInit(){
    this.getReasonById();
    this.getAllEmail()
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
  }


}
