import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';


@Component({
  selector: 'app-leave-approve-disapprove',
  templateUrl: './leave-approve-disapprove.component.html',
  styleUrls: ['./leave-approve-disapprove.component.scss']
})
export class LeaveApproveDisapproveComponent {
  leaveList: any
  isApproved: boolean = false;
  isDisapproved: boolean = false;
  id:string
  leaveTrackerList:any
  payload:any;
  fgsType :any
  constructor(  private leaveservice: LeaveService,
    private ngxLoader: NgxUiLoaderService,
      private toastr: ToastrMsgService,
      private route: Router
   ){
    this.fgsType = SPINNER.squareLoader;
   }



  ngOnInit(){
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getTableforLeaves()
  }

  getTableforLeaves() {
    this.leaveservice.getAllLeaveList().subscribe((res) => {
      this.leaveTrackerList =res
      this.leaveTrackerList = res.map((item) => {
        const cleanResponse = item.reason.replace(/<\/?p>/g, '');
        return { ...item, reason: cleanResponse };
      });

      console.log("response 24==>", res);
      this.ngxLoader.stop();
    });
  }



approve(id: string) {
  this.payload = {
    _id: id,
    username: localStorage.getItem('email'),
    employeeName: this.leaveTrackerList.employeeName,
    typeOfAssets: this.leaveTrackerList.typeOfAssets,
    addedBy:this.leaveTrackerList.addedBy,
    givenDate: this.leaveTrackerList.givenDate,
    returnDate: this.leaveTrackerList.returnDate,
    assetsDetails: this.leaveTrackerList.assetsDetails
  };

  console.log(this.payload);
  this.leaveservice.approveLeave(this.payload, id).subscribe((res) => {
    if (res) {
      this.getTableforLeaves()
      this.toastr.showSuccess(
        'Leave Approved successfully',
        'Leave Approved'
      );
      this.route.navigate(['/leaveMgmt/leave-approve-disapprove']);
    }
  });
}


disapprove(id: string) {
  this.payload = {
    _id: id,
    username: localStorage.getItem('email'),
    employeeName: this.leaveTrackerList.employeeName,
    typeOfAssets: this.leaveTrackerList.typeOfAssets,
    addedBy:this.leaveTrackerList.addedBy,
    givenDate: this.leaveTrackerList.givenDate,
    returnDate: this.leaveTrackerList.returnDate,
    assetsDetails: this.leaveTrackerList.assetsDetails
  };

  console.log(this.payload);
  this.leaveservice.disapproveLeave(this.payload, id).subscribe((res) => {
    if (res) {
      this.getTableforLeaves()

      this.toastr.showSuccess(
        'Leave Disapproved successfully',
        'Leave Disapproved'
      );

      this.route.navigate(['/leaveMgmt/leave-approve-disapprove']);
    }
  });
// }
}


}
