import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { modulePermissionList } from 'src/app/DummyData/permissionList';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { PermissionService } from 'src/app/_services/permission.service';
import { DialogComponent } from '../dialog/dialog.component';
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx';
import { NgStyle } from '@angular/common';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { TABLE_HEADING } from 'src/app/_models/table_heading';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit {
  @ViewChild('dt') dt:Table
  cols!: TABLE_HEADING[];
  exportColumns:any[];
  adminValue: any[]=[];



  modulePermissionList:any[]
  constructor(private dialog:MatDialog,private permissionService:PermissionService) {
    this.getPermittedModuleList()
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'username', show: true, headers: 'Username' },
      { field: 'moduleList', show: true, headers: 'Module List' },
    ]
      this.exportColumns = this.cols.map(col => ({title: col.headers,dataKey: col.field}))
  }

  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteAdminData(name)
      }
    });
  }

  deleteAdminData(name:string) {
    // this.ngxLoader.start();
    this.permissionService.deletePermissionDetails(name).subscribe(res => {
      if (res) {
        // this.toastr.showSuccess("lead deleted successfully", "lead deleted")
        this.getPermittedModuleList();
      }
    })
  }

  getPermittedModuleList(){
    this.permissionService.getPermittedModuleList().subscribe(res => {
     this.modulePermissionList=res
    })
  }

  globalSearch(value,mode)
  {
    this.dt.filterGlobal(value,mode)
  }
  //Search functionality start here
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.modulePermissionList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "admin");
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportPdf() {

    this.adminValue = this.modulePermissionList
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.adminValue
           });
            doc.save('role.pdf');
        }

}
