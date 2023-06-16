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
import * as XLSX from 'xlsx';

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



  exportExcel(): void {

    // Prepare the data for export
    const data = this.usertypeSettingData.map((item, index) => ({
      'S.No.': index+1,
      'User Type': item.userType,
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



  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  exportPdf() {
    this.usertypeData = this.usertypeSettingData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.usertypeData;
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'User Type', dataKey: 'userType' },


    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('User Type List.pdf');
  }

}
