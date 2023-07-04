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

export interface Option {
  id: number;
  name: string;
}
@Component({
  selector: 'app-product-option-list',
  templateUrl: './product-option-list.component.html',
  styleUrls: ['./product-option-list.component.scss']
})
export class ProductOptionListComponent implements OnInit {

  dt: any;
  ProductData:any[]=[]
  productListDetails:any

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private ProductService: ProductService,
    private toastr: ToastrMsgService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductoptionData()
  }

  getProductoptionData() {
    this.ProductService.getproductOptionList().subscribe((res) => {
      this.ProductData = res;
      console.log("product option 100"+ this.ProductData)
      this.ngxLoader.stop();
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
    const data = this.ProductData.map((item, index) => ({
      'S.No.': index + 1,
      'Product Name': item.productName,
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
    this.productListDetails = this.ProductData.map((item, index) => {
      return { sno: index + 1, ...item };
    });

    const doc = new jsPDF.jsPDF('l', 'pt');
    const data = this.productListDetails.map((item) => {
      return {
        ...item,
      };
    });
    const exportColumns = [
      { title: 'S No.', dataKey: 'sno' },
      { title: 'Product Name', dataKey: 'productName' },
    ];

    autoTable(doc, {
      columns: exportColumns,
      body: data,
    });

    doc.save('product Option list List.pdf');
  }


}
