import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { Table } from 'primeng/table';
import { access } from 'src/app/_models/modulepermission';
import { MatDialog } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DialogComponent } from '../dialog/dialog.component';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  categoryList: any[] = [];
  fgsType: any;
  exportColumns: any[];
  categoryDetails: any[];
  accessPermission: access;
  categoryListDetails: any;

  id: string;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private ProductService: ProductService,
    private toastr: ToastrMsgService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.sidebarSpacing = 'contracted';
    this.cols = [
      { field: '_id', show: true, headers: 'Id' },
      { field: 'name', show: true, headers: 'Name' },
      { field: 'parentCategoryId', show: true, headers: 'parent Category Id' },
      { field: 'image', show: true, headers: 'Image' },
      { field: 'status', show: true, headers: 'Status' },
    ];
    this.getCategoryList();
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  getCategoryList() {
    this.ProductService.getCategoryList().subscribe((res) => {
      console.log(res);
      this.categoryList = res;
      this.ngxLoader.stop();
    });
  }

  deleteCategory(categoryList: any) {
    this.ngxLoader.start();
    this.ProductService.deleteCategory(categoryList.id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Category deleted successfully',
          'Category delete'
        );
        this.getCategoryList();
      }
    });
  }

  openDialog(categoryList: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteCategory(categoryList);
      }
    });
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

  exportExcel(): void {
    const datePipe = new DatePipe('en-US');
    const data = this.categoryList.map((item, index) => ({
      'S.No.': index + 1,
      'Category Name': item.categoryName,
      'Sub Category': item.subCategory,
      'Category Order': item.categoryOrder,
      File: item.image,
      status: item.status,
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
    this.categoryListDetails = this.categoryList.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.categoryListDetails.map((item) => {
      return {
        ...item,
        createdAt: this.formatDate(item.createdAt), // Format the createdAt date
        updatedAt: this.formatDate(item.updatedAt), // Format the createdAt date
      };
    });
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Category Name', dataKey: 'categoryName' },
      { title: 'Sub Category ', dataKey: 'subCategory' },
      { title: 'categoryOrder', dataKey: 'categoryOrder' },
      { title: 'Category Image', dataKey: 'image' },
      { title: 'Status', dataKey: 'status' },
    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data,
    });

    doc.save('category List.pdf');
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
