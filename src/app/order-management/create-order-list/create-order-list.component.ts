import { Component, OnInit, ViewChild } from '@angular/core';
import * as xlsxPackage from 'xlsx'
import * as jsPDF from 'jspdf';
import autoTable, { Table } from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import { TABLE_HEADING } from 'src/app/_models/table_heading';

@Component({
  selector: 'app-create-order-list',
  templateUrl: './create-order-list.component.html',
  styleUrls: ['./create-order-list.component.scss']
})
export class CreateOrderListComponent implements OnInit {
  exportColumns: any[];
  @ViewChild('dt') dt: Table | undefined;
  categoryDetails:any[];
  cols!: TABLE_HEADING[];
  fgsType: any;

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: '_id', show: true, headers: 'Id' },
      { field: 'name', show: true, headers: 'Order ID' },
      { field: 'parentCategoryId', show: true, headers: 'parent Category Id' },
      { field: 'image', show: true, headers: 'Image' },
      { field: 'status', show: true, headers: 'Status' },
    ]
  }



  // applyFilterGlobal($event, stringVal) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }

  //   exportExcel() {
  //   const worksheet = xlsxPackage.utils.json_to_sheet(this.categoryList);
  //   const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, "orderList");
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

  // exportPdf() {
  //   this.categoryDetails = this.categoryList
  //           const doc = new jsPDF.jsPDF('l', 'pt');
  //          autoTable(doc, {
  //           columns:this.exportColumns,
  //           body:this.categoryDetails
  //          });
  //           doc.save('orderList.pdf');
  //       }

}
