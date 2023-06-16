import { Component, OnInit, ViewChild } from '@angular/core';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RatingCriteriaService } from 'src/app/_services/rating-criteria.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rating-criteria',
  templateUrl: './rating-criteria.component.html',
  styleUrls: ['./rating-criteria.component.scss'],
})
export class RatingCriteriaComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  cols: any[];
  ratingData: any[];
  exportColumns: any[];
  ratingSettingData: any[];
  accessPermission: access;
  @ViewChild('dt') dt: Table | undefined;
  statusList: string[] = ['Active', 'Inactive'];
  constructor(
    private ratingCriteriaService: RatingCriteriaService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private dialog: MatDialog,
    private permissionService: ModulePermissionService
  ) {
    this.permissionService.getModulePermission().subscribe((res) => {
      this.accessPermission = res[0].RatingSetting;
      console.log(this.accessPermission);
      this.getCriteriaList();
    });
  }

  ngOnInit(): void {
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  getCriteriaList() {
    this.ratingCriteriaService.getCriteriaList().subscribe((res) => {
      this.ratingSettingData = res;
    });
  }

  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteCriteriaDetail(name._id);
      }
    });
  }

  deleteCriteriaDetail(name:any){
    this.ratingCriteriaService.deleteCriteriaDetails(name).subscribe(res => {
      if (res) {
        this.toastr.showSuccess(
          'rating criteria deleted successfully',
          'criteria deleted'
        );
        this.getCriteriaList();
      }
    });
  }

  exportExcel(): void {

    // Prepare the data for export
    const data = this.ratingSettingData.map((item, index) => ({
      'S.No.': index+1,
      'Rating Criteria': item.ratingCriteria,
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
    this.ratingData = this.ratingSettingData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.ratingData;
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Rating Criteria', dataKey: 'ratingCriteria' },

    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('Rating Criteria List.pdf');
  }

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
