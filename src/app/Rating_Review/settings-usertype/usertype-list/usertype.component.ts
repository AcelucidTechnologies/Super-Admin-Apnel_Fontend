import { Component, OnInit, ViewChild } from '@angular/core';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { UsertypeService } from 'src/app/_services/usertype.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.scss'],
})
export class UserTypeComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  cols:any[];
  usertypeData:any[];
  exportColumns:any[];
  usertypeSettingData:any[];
  accessPermission:access
  @ViewChild('dt') dt:Table|undefined
  statusList:string[]=['Active','Inactive']
  constructor( private usertypeService: UsertypeService,
    private dialog:MatDialog,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].RatingSetting
        console.log( this.accessPermission)
        this.getUsertypeList()
      })
    }


  ngOnInit(): void {
    this.cols=[{field:"userType",headers:"User Type"},
    {field:"status",headers:"Status"},
  ]
    this.exportColumns = this.cols.map(col => ({title: col.headers,dataKey: col.field}))
    console.log(this.exportColumns)
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  getUsertypeList(){
    this.usertypeService.getUsertypeList().subscribe((res)=>{
      this.usertypeSettingData=res
    })
  }

  openDialog(deleteList: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteUsertypeDetails(deleteList)
      }
    });
  }

  deleteUsertypeDetails(types: any){
    this.usertypeService.deleteUsertypeDetails(types._id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("UserType deleted successfully", "UserType deleted")
        this.getUsertypeList();
      }
  })}

  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.usertypeSettingData);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "usertype");
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  exportPdf() {
    this.usertypeData = this.usertypeSettingData
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.usertypeData
           });
            doc.save('usertype.pdf');
        }
          // search functionality start here

}
