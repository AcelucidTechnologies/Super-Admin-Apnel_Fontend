import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReviewerService } from 'src/app/_services/reviewer.service';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { access } from 'src/app/_models/modulepermission';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.scss'],
})
export class ReviewerComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  cols: any[];
  @ViewChild('dt') dt: Table | undefined;
  reviewerData: any[]=[];
  reviewerDetails: any[];
  exportColumns: any[];
  accessPermission: access;

  statusList = ['Active', 'Inactive'];
  constructor(
    private reviewerService: ReviewerService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    private permissionService: ModulePermissionService
  ) {
    this.permissionService.getModulePermission().subscribe((res) => {
      this.accessPermission = res[0].ReviewerList;
      console.log(this.accessPermission);
    });
    this.getReviewerData();
  }

  ngOnInit(): void {

  }

  getReviewerData() {
    this.reviewerService.getReviewerList().subscribe((res) => {
      this.reviewerData = res;
      console.log('51', this.reviewerData);
    });
  }

  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteReviewDetails(name);
      }
    });
  }

  deleteReviewDetails(id: any) {
    this.reviewerService.deleteReviewerDetails(id._id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'reviewer deleted successfully',
          'reviewer deleted'
        );
        this.getReviewerData();
      }
    });
  }


  exportExcel(): void {
    const datePipe = new DatePipe('en-US');

    // Prepare the data for export
    const data = this.reviewerData.map((item, index) => ({
      'S.No.': index+1,
      'Name': item.name,
      'Email': item.email,
      'Rating Count': item.ratingCount,
      Date: datePipe.transform(item.firstRating, 'MM/dd/yyyy'),
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
    this.reviewerDetails = this.reviewerData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    // const data = this.reviewerDetails;
    const data = this.reviewerDetails.map(item => {
      return {
        ...item,
        firstRating: this.formatDate(item.firstRating) // Format the createdAt date
      };
    });
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Email ', dataKey: 'email' },
      { title: 'Rating Count', dataKey: 'ratingCount' },
      { title: 'Date', dataKey: 'firstRating' },

    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('Reviewer List.pdf');
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

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
