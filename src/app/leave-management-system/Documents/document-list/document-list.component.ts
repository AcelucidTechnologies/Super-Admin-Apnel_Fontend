import { Component, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { access } from 'src/app/_models/modulepermission';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { LeaveService } from 'src/app/_services/leave.service';
import { Table } from 'primeng/table';
import autoTable from 'jspdf-autotable';
import { DialogDocumentComponent } from '../dialog-document/dialog-document.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  docuemntData: any[]=[];
  documentDetails:any

  sidebarSpacing: string = 'contracted';
  cols: any[];
  @ViewChild('dt') dt: Table | undefined;
  exportColumns: any[];

  statusList = ['Active', 'Inactive'];
  constructor(
    private leaveService: LeaveService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {


  }

  ngOnInit(): void {
this.getDocumentData();
  }



  getDocumentData() {
    this.leaveService.getDocumentList().subscribe((res) => {
      this.docuemntData = res;
      console.log('51', this.docuemntData);
    });
  }

  openDialog(name: any) {
    const dialogRef = this.dialog.open(DialogDocumentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteDocumentDetails(name);
      }
    });
  }

  deleteDocumentDetails(id: any) {
    this.leaveService.deleteDocument(id._id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Document deleted successfully',
          'Document deleted'
        );
        this.getDocumentData()
      }
    });
  }

  downloadFile(fileUrl: string) {
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
      link.click();
    });
  }

  exportExcel(): void {
    const datePipe = new DatePipe('en-US');
    const data = this.docuemntData.map((item, index) => ({
      'S.No.': index+1,
      'Folder Name': item.folderName,
      'File': item.image,
      ModifiedTime: datePipe.transform(item.updatedAt, 'MM/dd/yyyy'),
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
    this.documentDetails = this.docuemntData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.documentDetails.map(item => {
      return {
        ...item,
        createdAt: this.formatDate(item.createdAt), // Format the createdAt date
        updatedAt: this.formatDate(item.updatedAt) // Format the createdAt date
      };
    });
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Folder Name', dataKey: 'folderName' },
      { title: 'File ', dataKey: 'image' },
      { title: 'ModifiedTime', dataKey: 'updatedAt' },

    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data
    });

    doc.save('Document List.pdf');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  // search functionality start here

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
