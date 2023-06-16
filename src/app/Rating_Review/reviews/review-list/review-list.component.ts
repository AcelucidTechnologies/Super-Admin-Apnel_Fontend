import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ReviewsService } from 'src/app/_services/reviews.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  sidebarSpacing:string='contracted'
  @ViewChild('dt') dt:Table|any
  cols:any[]
  reviewListValue:any[]=[]
  reviewDetails:any[]
  exportColumns:any[]
  statusList:string[]=['Active','Inactive']
  accessPermission:access
  constructor(private reviewsService:ReviewsService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    public dialog:MatDialog,private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].RatingList
        console.log( this.accessPermission)
        this.getReviewList()
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
getReviewList(){
  this.reviewsService.getReviewList().subscribe((res)=>{
    this.reviewListValue=res
    console.log("55",this.reviewListValue)
  })
}


exportExcel(): void {


  // Prepare the data for export
  const data = this.reviewListValue.map((item, index) => ({
    'S.No.': index+1,
    'Review Subject': item.reviewSubject,
    'Publishing Site Url': item.publishingSiteUrl,
    'Rating Count': item.ratingCountReview,
    // Date: item.createdAt,

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
  this.reviewDetails = this.reviewListValue.map((item, index) => {
    return { sno: index + 1, ...item };
  });

  const doc = new jsPDF.jsPDF('l', 'pt');
  const data = this.reviewDetails;
  const exportColumns = [
    { title: 'S No.', dataKey: 'sno' },
    { title: 'Review Subject', dataKey: 'reviewSubject' },
    { title: 'Publishing Site Url', dataKey: 'publishingSiteUrl' },
    { title: 'Rating Count ', dataKey: 'ratingCountReview' },

  ];

  autoTable(doc, {
    columns: exportColumns,
    body: data
  });

  doc.save('Review List.pdf');
}
      openDialog(name: any) {
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.deleteReviewDetails(name._id)
          }
        });
      }

      deleteReviewDetails(id:number) {
        this.ngxLoader.start();
        this.reviewsService.deleteReviewDetails(id).subscribe(res => {
          if (res) {
            this.toastr.showSuccess("Review deleted successfully", "Review deleted")
            this.getReviewList();
          }
        })
      }
//search functionality
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
