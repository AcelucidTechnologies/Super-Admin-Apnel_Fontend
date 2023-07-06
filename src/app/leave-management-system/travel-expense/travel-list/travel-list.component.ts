import { Component, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { LeaveService } from 'src/app/_services/leave.service';
import { Table } from 'primeng/table';
import autoTable from 'jspdf-autotable';
import { DialogTravelComponent } from '../dialog-travel/dialog-travel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss'],
})
export class TravelListComponent {
  travelData: any[] = [];
  exitDetails: any;
  fgsType: any;
  payload:any;
  isClicked = false;
  selectedRow: any;

  sidebarSpacing: string = 'contracted';
  cols: any[];
  @ViewChild('dt') dt: Table | undefined;

  exportColumns: any[];

  statusList = ['Active', 'Inactive'];
  constructor(
    private leaveService: LeaveService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    private route: Router
  ) {
    this.fgsType = SPINNER.squareLoader;
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getTravelData();
  }

  isHidden(role: string): boolean {
    return role === 'superAdmin';
  }
  getTravelData() {
    this.leaveService.getTravelList().subscribe((res) => {
      this.travelData = res;
      console.log("travel list 100=>" + JSON.stringify(this.travelData))
      this.ngxLoader.stop();
    });
  }

    approve(id: string) {
      const row = this.travelData.find(item => item._id === id);
      if (row) {
        row.isClicked = true;
      }
      this.payload = {
        _id: id,
        username: localStorage.getItem('email'),
        employeeName: this.travelData[0].employeeName,
        employeeId: this.travelData[0].employeeId,
        journeyDate:this.travelData[0].journeyDate,
        returnDate: this.travelData[0].returnDate,
        travelFrom: this.travelData[0].travelFrom,
        travelTo: this.travelData[0].travelTo,
        purposeTravel: this.travelData[0].purposeTravel
      };

      console.log(this.payload);
      this.leaveService.approveReimbursement(this.payload,id).subscribe((res) => {
        const row = this.travelData.find(item => item._id === id);
        if (row) {
          row.isClicked = true;

          this.toastr.showSuccess(
            'Reimbursement Approved successfully',
            'Reimbursement Approved'
          );
          // this.route.navigate(['/leaveMgmt/leave-approve-disapprove']);
        }
      });
    }

  // disapprove(id: string) {
  //   this.payload = {
  //     _id: id,
  //     username: localStorage.getItem('email'),
  //     employeeName: this.travelData.employeeName,
  //     typeOfAssets: this.travelData.typeOfAssets,
  //     addedBy:this.travelData.addedBy,
  //     givenDate: this.travelData.givenDate,
  //     returnDate: this.travelData.returnDate,
  //     assetsDetails: this.travelData.assetsDetails
  //   };

  //   console.log(this.payload);
  //   this.leaveservice.disapproveLeave(this.payload, id).subscribe((res) => {
  //     if (res) {
  //       this.getTableforLeaves()

  //       this.toastr.showSuccess(
  //         'Leave Disapproved successfully',
  //         'Leave Disapproved'
  //       );

  //       this.route.navigate(['/leaveMgmt/leave-approve-disapprove']);
  //     }
  //   });

  // }
  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogTravelComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteTravelDetails(name);
      }
    });
  }

  deleteTravelDetails(id: any) {
    this.leaveService.deleteTravel(id._id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Travel Expense deleted successfully',
          'Travel Expense deleted'
        );
        this.getTravelData();
      }
    });
  }

  exportExcel(): void {
    const datePipe = new DatePipe('en-US');
    const data = this.travelData.map((item, index) => ({
      'S.No.': index + 1,
      'Employee Id': item.employeeId,
      'Travel From': item.travelFrom,
      'Travel To': item.travelTo,
      JourneyDate: item.journeyDate,
      ReturnDate: item.returnDate,
      'Added By': item.addedBy,
      AddedTime: datePipe.transform(item.createdAt, 'MM/dd/yyyy'),
      'Modified By': item.addedBy,
      ModifiedTime: datePipe.transform(item.updatedAt, 'MM/dd/yyyy'),
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a Blob from the workbook
    const workbookBlob = this.workbookToBlob(workbook);

    // Create a download link
    const url = URL.createObjectURL(workbookBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table_data.xlsx';

    // Simulate a click on the link to start the download
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }

  // Helper function to convert a workbook to Blob
  private workbookToBlob(workbook: XLSX.WorkBook): Blob {
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    return blob;
  }

  exportPdf() {
    this.exitDetails = this.travelData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    // const data = this.reviewerDetails;
    const data = this.exitDetails.map((item) => {
      return {
        ...item,
        createdAt: this.formatDate(item.createdAt), // Format the createdAt date
        updatedAt: this.formatDate(item.updatedAt), // Format the createdAt date
      };
    });
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Employee Id', dataKey: 'employeeId' },
      { title: 'Travel From', dataKey: 'travelFrom' },
      { title: 'Travel To', dataKey: 'travelTo' },
      { title: 'JourneyDate', dataKey: 'journeyDate' },
      { title: 'ReturnDate', dataKey: 'returnDate' },
      { title: 'Added By', dataKey: 'addedBy' },
      { title: 'AddedTime', dataKey: 'createdAt' },
      { title: 'Modified By', dataKey: 'addedBy' },
      { title: 'ModifiedTime', dataKey: 'updatedAt' },
    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data,
    });

    doc.save('Travel Expense List.pdf');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  // search functionality start here

  applyFilterGlobal(event: Event, stringVal: string) {
    const searchValue = (event.target as HTMLInputElement).value;

    // Check if the search value is empty or contains only whitespace
    if (!searchValue || /^\s*$/.test(searchValue)) {
      // Clear the global filter if the search value is empty
      this.dt.filterGlobal('', stringVal);
    } else {
      // Apply the global filter with the search value
      this.dt.filterGlobal(searchValue.trim(), stringVal);
    }
  }
}
