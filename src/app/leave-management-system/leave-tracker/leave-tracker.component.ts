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
  activeButton: string = 'all';
  fromdateList:any
  casualLeave:any
  earned:any
  sickLeave:any
  leaveWithoutpay:any
  workFromHome:any
  compOff:any
  leaveTrackerList: any[];
  upcomingLeaveTrackerList: any[];
  filteredLeaveTrackerList: any[];
  constructor(  private LeaveService: LeaveService,
    private ngxLoader: NgxUiLoaderService,
      private toastr: ToastrMsgService,
   ){

   }
   ngOnInit(){
     this.getAllLeaves(),
     this.getTableforLeaves()
   }

   getAllLeaves() {
    this.LeaveService.getLeaveList().subscribe((res) => {
      this.leaveList =res;
      this.casualLeave=this.leaveList[0].casualLeave;
      this.earned=this.leaveList[0].earned;
      this.leaveWithoutpay=this.leaveList[0].leaveWithoutpay;
      this.sickLeave=this.leaveList[0].sickLeave;
      this.workFromHome=this.leaveList[0].workFromHome;
      this.compOff=this.leaveList[0].compOff;
      this.ngxLoader.stop();
    });
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'approved':
        return 'orange';
      case 'disapproved':
        return 'blue';
      case 'pending':
        return 'green';
      default:
        return '';
    }
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }


  getTableforLeaves() {
    this.LeaveService.getLeaveTrackerList().subscribe((res) => {
      this.leaveTrackerList =res
      this.leaveTrackerList = res.map((item) => {
        const cleanResponse = item.reason.replace(/<\/?p>/g, '');
        return { ...item, reason: cleanResponse };
      });
      this.filteredLeaveTrackerList = this.leaveTrackerList;

      console.log("response todate list 101==>", this.fromdateList);
      this.ngxLoader.stop();
      this.filterAllList();

    });
  }

  filterAllList() {
    this.activeButton = 'all';
    this.filteredLeaveTrackerList = this.leaveTrackerList;
    console.log("All dates: " + JSON.stringify(this.filteredLeaveTrackerList));
  }

  filterUpcomingList() {
    this.activeButton = 'upcoming';
    const today = new Date();
    this.filteredLeaveTrackerList = this.leaveTrackerList.filter((item) => {
      const fromDate = new Date(item.fromDate);
      return fromDate > today || fromDate.toDateString() === today.toDateString();
    });

    console.log("Upcoming dates: " + JSON.stringify(this.filteredLeaveTrackerList));
  }

  filterHistoryList() {
    this.activeButton = 'history';
    const today = new Date();
    this.filteredLeaveTrackerList = this.leaveTrackerList.filter((item) => {
      const fromDate = new Date(item.fromDate);
      return fromDate < today && fromDate.toDateString() !== today.toDateString();
    });

    console.log("History dates: " + JSON.stringify(this.filteredLeaveTrackerList));
  }
}
