import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { ratingStructure } from 'src/app/_models/rating';
import { RatingService } from 'src/app/_services/rating.service';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DialogComponent } from '../dialog/dialog.component';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsertypeService } from 'src/app/_services/usertype.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
})
export class RatingListComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  sortField: string;
sortOrder: number;
  ratingData: any[] = [];
  ratingDetails: any[];
  sidebarSpacing: string;
  cols: Table | any;
  statusList: string[];
  exportColumns: any[];
  accessPermission: access;
  usertypeSettingData: any;

  ratingList: any[]=[]
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private ratingService: RatingService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog,
    private permissionService: ModulePermissionService
  ) {
    this.permissionService.getModulePermission().subscribe((res) => {
      this.accessPermission = res[0].ReviewList;
      console.log(this.accessPermission);
    });
  }

  ngOnInit(): void {
    this.statusList = ['Approved', 'Not Approved'];
    this.sidebarSpacing = 'contracted';

    this.getRatingDetails();
  }





  getRatingDetails() {
    this.ratingService.getRatingList().subscribe((res) => {
      this.ratingData = res;
    });
  }
  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }



    exportExcel(): void {
      const datePipe = new DatePipe('en-US');

      // Prepare the data for export
      const data = this.ratingData.map((item, index) => ({
        'S.No.': index+1,
        'Overall': item.overall,
        'Review Subject': item.review,
        'Reviewer': item.reviewer,
        // Date: item.createdAt,
        Date: datePipe.transform(item.createdAt, 'MM/dd/yyyy'),
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
    this.ratingDetails = this.ratingData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.ratingDetails.map(item => {
      return {
        ...item,
        createdAt: this.formatDate(item.createdAt) // Format the createdAt date
      };
    });
    // const data = this.ratingDetails;
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Overall', dataKey: 'overall' },
      { title: 'Review Subject', dataKey: 'review' },
      { title: 'Reviewer', dataKey: 'reviewer' },
      { title: 'Date', dataKey: 'createdAt' },
    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('Rating List.pdf');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteRatingDetails(name._id);
      }
    });
  }

  deleteRatingDetails(id: number) {
    this.ngxLoader.start();
    this.ratingService.deleteRatingDetails(id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Rating deleted successfully',
          'rating deleted'
        );
        this.getRatingDetails();
      }
    });
  }
  // search functionality start here
  // applyFilterGlobal($event, stringVal) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }
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
