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
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.reviewerData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'reviewers');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  // exportPdf() {
  //   this.reviewerDetails = this.reviewerData;
  //   console.log(this.reviewerDetails);
  //   const doc = new jsPDF.jsPDF('l', 'pt');
  //   autoTable(doc, {
  //     columns: this.exportColumns,
  //     body: this.reviewerDetails,
  //   });
  //   doc.save('reviewers.pdf');
  // }

  exportPdf() {
    this.reviewerDetails = this.reviewerData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.reviewerDetails;
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Email ', dataKey: 'email' },
      { title: 'Rating Count', dataKey: 'ratingCount' },
      { title: 'First Rating', dataKey: 'firstRating' },
      { title: 'Status', dataKey: 'status' },
    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('Reviewer List.pdf');
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
