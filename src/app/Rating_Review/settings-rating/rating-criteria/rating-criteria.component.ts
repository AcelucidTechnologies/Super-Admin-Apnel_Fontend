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

  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.ratingSettingData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'ratingCriterias');
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


  exportPdf() {
    this.ratingData = this.ratingSettingData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.ratingData;
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Rating Criteria', dataKey: 'ratingCriteria' },
      { title: 'Status', dataKey: 'status' },

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
