import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent {
  applied = new FormControl();
  type: any;
  leaveType: any;
  appliedToType: any;
  emailList: any;
  selectForm: FormGroup;
  page: any;
  employeeList: any[] = [];
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router
  ) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem('email'),
      leaveType: ['', [Validators.required]],
      fromDate: ['', [Validators.required, this.validateFromDate.bind(this)]],
      toDate: ['', [Validators.required, this.validateToDate.bind(this)]],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      altConatctNo: ['', [Validators.pattern(/^\d{10}$/)]],
      reason: ['', [Validators.required]],
      image: [''],
      appliedTo: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });
    this.selectForm.get('leaveType').valueChanges.subscribe((value) => {
      this.validateFromDate(value);
    });
  }

  ngOnInit(): void {
    this.getAllEmail();

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

  getMinimumDate() {
    const leaveType = this.selectForm?.get('leaveType')?.value;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return currentDate.toISOString().split('T')[0];
  }

  validateFromDate(control) {
    const leaveType = this.selectForm?.get('leaveType')?.value;

    if (leaveType !== 'earned') {
      return null; // Skip validation for other leave types
    }

    const fromDate = new Date(control.value);
    const currentDate = new Date();
    const differenceInDays = Math.floor(
      (fromDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );

    return differenceInDays >= 3 ? null : { invalidFromDate: true };
  }

  validateToDate(control) {
    const fromDate = this.selectForm?.get('fromDate')?.value;
    const toDate = new Date(control.value);

    if (!fromDate || !toDate || toDate >= new Date(fromDate)) {
      return null;
    }

    return { invalidToDate: true };
  }

  getAllEmail() {
    this.leaveservice.getEmail().subscribe((res) => {
      this.employeeList = res;
      this.ngxLoader.stop();
      console.log('email' + JSON.stringify(this.employeeList));
    });
  }

  submit() {
    this.ngxLoader.start();
    this.leaveservice.createLeave(this.selectForm.value).subscribe((res) => {
      this.page = res;
      console.log('leave data 107===>' + this.page);
      if (res) {
        if (this.page.error) {
          this.toastr.showError(`${this.page.error}`, 'Leave Applied');
          this.route.navigate(['/leaveMgmt/leave-apply']);
          this.ngxLoader.start();
        } else {
          this.toastr.showSuccess(
            'Leave applied successfully',
            'Leave Applied'
          );

          this.route.navigate(['/leaveMgmt/leave-tracker']);
          // this.ngxLoader.start();
          setTimeout(() => {
            location.reload();
          }, 0);

        }
      }
    });

  }
}
