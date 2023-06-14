import { CmsService } from '../../_services/cms.service';
import { LeaveService } from '../../_services/leave.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { MatDialog } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  fgsType: any;
  profileList: any[]=[]
  profile: any[]=[]
  accessPermission:access
  profileDetails:any[];
  exportColumns: any[];
  id:string
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/profile/";
  selectedCustomers: any[];

  constructor(private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
    private LeaveService: LeaveService,

    private permissionService:ModulePermissionService,
    public dialog: MatDialog) {
      this.fgsType = SPINNER.squareLoader;
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].CmsBanner
      })
     }

     ngOnInit(): void {
      this.fgsType = SPINNER.squareLoader
      this.ngxLoader.start();
      this.sidebarSpacing = 'contracted';
      this.getAllProfile();
    }

    getAllProfile() {
      this.LeaveService.getProfileList().subscribe((res) => {
        this.profileList =res
        console.log("response 24==>", res);
        this.ngxLoader.stop();
      });
    }

    deleteProfileList(profileList: any) {
      this.ngxLoader.start();
      this.LeaveService.deleteProfile(profileList._id).subscribe(res => {
        if (res) {
          this.toastr.showSuccess("Profile deleted successfully", "profile delete")
          this.getAllProfile()
        }
      })
    }
    openDialog(deleteList: any) {
      const dialogRef = this.dialog.open(ProfileDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.deleteProfileList(deleteList)
        }
      });
    }

    onToggleSidebar(sidebarState: any) {
      if (sidebarState === 'open') {
        this.sidebarSpacing = 'contracted';
      } else {
        this.sidebarSpacing = 'expanded';
      }
    }

          exportExcel() {
            const worksheet = xlsxPackage.utils.json_to_sheet(this.profileList);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Profile");
          }

    saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }


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

    exportPdf() {
      this.profileDetails = this.profileList.map((item, index) => {
        return { sno: index + 1, ...item }; // Add the sno property with the serial number
      });

      const doc = new jsPDF.jsPDF('l', 'pt');
      const data = this.profileDetails;
      const exportColumns = [
        { title: 'S No.', dataKey: 'sno' },
        { title: 'Employee Name', dataKey: 'employeeFullName' },
        { title: 'Email', dataKey: 'email' },
        { title: 'Department', dataKey: 'department' },
        { title: 'Image', dataKey: 'image' },
      ];

      autoTable(doc, {
        columns: exportColumns,
        body: data
      });

      doc.save('Profile.pdf');
    }



}
