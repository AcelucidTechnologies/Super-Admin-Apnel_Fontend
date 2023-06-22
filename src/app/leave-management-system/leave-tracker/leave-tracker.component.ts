import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { LeaveService } from 'src/app/_services/leave.service';

@Component({
  selector: 'app-leave-tracker',
  templateUrl: './leave-tracker.component.html',
  styleUrls: ['./leave-tracker.component.scss']
})
export class LeaveTrackerComponent {


  leaveList: any
  constructor(  private LeaveService: LeaveService,
    private ngxLoader: NgxUiLoaderService,
      private toastr: ToastrMsgService,
   ){

   }
   ngOnInit(){
     this.getAllLeaves()
   }

   getAllLeaves() {
    this.LeaveService.getLeaveList().subscribe((res) => {
      this.leaveList =res
      console.log("response 24==>", res);
      this.ngxLoader.stop();
    });
  }

}
