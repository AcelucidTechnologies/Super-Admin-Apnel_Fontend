import { Component } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { LeaveService } from 'src/app/_services/leave.service';

@Component({
  selector: 'app-leave-tracker',
  templateUrl: './leave-tracker.component.html',
  styleUrls: ['./leave-tracker.component.scss'],
})
export class LeaveTrackerComponent {
  leaveList: any;
  activeButton: string = 'all';
  fromdateList: any;
  casualLeave: any;
  earned: any;
  sickLeave: any;
  leaveWithoutpay: any;
  workFromHome: any;
  compOff: any;
  leaveTrackerList: any[];
  upcomingLeaveTrackerList: any[];
  filteredLeaveTrackerList: any[];
  defaultLeave:number = 0
  fgsType: any;
  constructor(
    private LeaveService: LeaveService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService
  ) {
    this.fgsType = SPINNER.squareLoader;
  }
  ngOnInit() {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getAllLeaves(), this.getTableforLeaves();
  }

  getAllLeaves() {
    this.ngxLoader.start();
    this.LeaveService.getLeaveList().subscribe((res) => {
      this.leaveList = res;
      this.casualLeave = this.leaveList[0].casualLeave;
      this.earned = this.leaveList[0].earned;
      this.leaveWithoutpay = this.leaveList[0].leaveWithoutpay;
      this.sickLeave = this.leaveList[0].sickLeave;
      this.workFromHome = this.leaveList[0].workFromHome;
      this.compOff = this.leaveList[0].compOff;
      this.ngxLoader.stop();
    });
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Disapproved':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return '';
    }
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  getTableforLeaves() {
    this.LeaveService.getLeaveTrackerList().subscribe((res) => {
      this.leaveTrackerList = res;
      this.leaveTrackerList = res.map((item) => {
        const cleanResponse = item.reason.replace(/<\/?p>/g, '');
        return { ...item, reason: cleanResponse };
      });
      this.filteredLeaveTrackerList = this.leaveTrackerList;
      this.ngxLoader.stop();
      this.filterAllList();
    });
  }

  filterAllList() {
    this.activeButton = 'all';
    this.filteredLeaveTrackerList = this.leaveTrackerList;
  }

  filterUpcomingList() {
    this.activeButton = 'upcoming';
    const today = new Date();
    this.filteredLeaveTrackerList = this.leaveTrackerList.filter((item) => {
      const fromDate = new Date(item.fromDate);
      return (
        fromDate > today || fromDate.toDateString() === today.toDateString()
      );
    });
  }

  filterHistoryList() {
    this.activeButton = 'history';
    const today = new Date();
    this.filteredLeaveTrackerList = this.leaveTrackerList.filter((item) => {
      const fromDate = new Date(item.fromDate);
      return (
        fromDate < today && fromDate.toDateString() !== today.toDateString()
      );
    });
  }
}
