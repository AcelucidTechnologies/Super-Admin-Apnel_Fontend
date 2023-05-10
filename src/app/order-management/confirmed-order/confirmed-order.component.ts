import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { order } from 'src/app/_models/order';
import { OrdersService } from 'src/app/_services/orders.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TABLE_HEADING } from '../../_models/table_heading';
import { Table } from 'primeng/table';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-confirmed-order',
  templateUrl: './confirmed-order.component.html',
  styleUrls: ['./confirmed-order.component.scss'],
})
export class ConfirmedOrderComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  cols!: TABLE_HEADING[];
  confirmedOrder: order[] = [];
  fgsType: any;
  exportColumns:any[];
  confirmValue:any[];
  @Input() deleteAccess:boolean;
  constructor(
    private orderService: OrdersService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService
  ) {}

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getConfirmedOrderList();

    this.cols = [
      { field: 'orderId', show: true, headers: 'Order Id' },
      { field: 'Customer Name', show: true, headers: 'Customer Name' },
      { field: 'Contact No', show: true, headers: 'Contact No' },
      { field: 'Total', show: true, headers: 'Total' },
      { field: 'Order Date', show: true, headers: 'Order Date' },
    ];
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    console.log($event);
  }
  deleteOrder(order: number) {
    this.ngxLoader.start();
    this.orderService.deleteConfirmedOrder(order).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('ConfirmedOrder deleted successfully', 'order deleted');
        this.getConfirmedOrderList();
      }
    });
  }
  getConfirmedOrderList() {
    this.orderService.getConfirmedOrderList().subscribe((data) => {
      this.confirmedOrder = data;
      this.ngxLoader.stop();
      console.log("confirmed order" + JSON.stringify(this.confirmedOrder))
    });
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.confirmedOrder);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "confirmOrder");
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
    this.confirmValue = this.confirmedOrder
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.confirmValue
           });
            doc.save('confirmOrder.pdf');
        }
}
