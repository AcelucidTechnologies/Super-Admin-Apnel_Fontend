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
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent {
  DefaultImage: any =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALgAuAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQUGBAMC/8QANxAAAgIBAgMFBAgGAwAAAAAAAAECAwQFESExQRITIlFhMlJxgRQjQnKRocHRBhUkQ2OxNGKS/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPXHxrsmXZpg5eb6L5lpTofXIt29IfuBTDc0tekYcOdbn96TPX+X4m230eH4AZUGmnpWFL+12futo5LtDhtvRbJPynxApAdGThZGNu7YeH3o8Uc4AAAAAAAAAAAAAAAAAAAC20/SXYlblcI9ILr8T00fTtuzk3rdvjCL6epcgfMIRhFRhFRiuiPoAAAAAAAPitnxRU6hpEJp2YvhnzcOj/YtgBjZRlCTjOLjJc0+hBo9V09ZUO8rSVsV/6XkzOPdPZpprg0AAAAAAAAAAAAAADu0nE+lZPjX1cPE/XyRwmm0ijuMOG62lPxSA7UtlsuQAAAkAQCQBAJAEAkAQUWu4nYn9JrXCXCfx6F8eWTTG+iyqXKS2+YGQBMouEnGXNPZkAAAAAAAAAAAB6UV97fXX70kjXLhwXQzGlR31Cn0e/5GoAEoglAAAAAAAAAAAAAAGX1evus+xL7Xi/E4y0/iBf1kH/jX+2VYAAAAAAAAAAAdelPs6hS31e35GoMhRPur67Pdkma9NPigBKIJQAAAAAAAAAAAAABn/4gf9ZWv8f6sqzt1ezvM+3blHaJxAAAAAAAAAAAANNpN6vw47vxQ8L+RmTt0rLWLk+J/VT4P08mBpiUQvQlAAAAAAAAAAAAPLJujRRO2XKK3+J6lFruX25/Rq34Y8Z/HyAqZSc5OUnvJvdsgAAAAAAAAAAAAAAAu9H1BNLGulx5Qk+voXJiy30/V+wlVlNuPSf7gXoPmE4zj2oNNeaZ9AAAAAAAEN7Ld8iq1DV4QTrxX2p+/wBEB66rnrGh3dbXfSXD/qvMzrbbbbbb57ibc5OUm5SfFt82QAAAAAAAAAAAAAAAAAB60Y12RwqrlL122R2S0bKVfaTg5L7G/EDkx8m7HlvTY4+nRlpRrvS+r5wf6Mp7K51y7M4SjLykj5A00NWw5Ljb2X5STPT+Y4e3/Jr/ABMqANPLVMOP95P7qZy3a5BcKanJ+cnsUQA6cnOyMndWWbR9yPBHN0JScntFNvyR306Rk2Q7TSr8oyfECvB0ZGFkY/G2p7e8uKOcAAAAAAAAAAAAB642PZk3Rqq23fnyQHzTVO+arqi5SfQvMPR6q9p5H1k/Lov3OzDxK8SpQrXHrJ82dIERSitopJLkkSAB8W1Qtj2bYRkvKS3OC7RsWfsqdf3WWQApJ6E/sZHD1gfD0K7pdD8GXwAo46FP7eQvlE6KtFx4e3Kdno3svyLQAeVOPTQtqq4x+CPUACHxODM0unI4x+rn5x5P4osABkcrFtxLOzdHbf2ZLkzxNffTC+t12xUoszWoYc8O3svxQfsS/R+oHKAAAAAAD8gJS3aS5vkabTMKOJRxX1k+M3+hV6Hjd7kO2S8NfL4mhAjYAASAAAAAAAAAAAAAAAAeOVjwyaZVz5Pk/J+Z7ADHXVSpunVNeKL2Z8F3r+NvCORBcY8J/DoUgAAAAwANRpVHcYVcX7Ul2pfM7AAAAAAAAAAAAAAAAAAAAAAADzyKldTOuXKS2MjOLhNwlzi9mAB8gAD/2Q==';


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


    exportExcel(): void {

      // Prepare the data for export
      const data = this.profileList.map((item, index) => ({
        'S.No.': index+1,
        'Employee Name': item.employeeFullName,
        'Email': item.email,
        'Department': item.department,
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

      ];

      autoTable(doc, {
        columns: exportColumns,
        body: data
      });

      doc.save('Profile.pdf');
    }



}
