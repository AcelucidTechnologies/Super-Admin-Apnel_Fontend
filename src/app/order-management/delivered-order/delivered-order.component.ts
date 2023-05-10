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
  selector: 'app-delivered-order',
  templateUrl: './delivered-order.component.html',
  styleUrls: ['./delivered-order.component.scss'],
})
export class DeliveredOrderComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  cols!: TABLE_HEADING[];
  deliveredOrder: order[] = [];
  fgsType: any;
  exportColumns:any[];
  orderValue:any[];
  @Input() deleteAccess:boolean;
  constructor(
    private orderService: OrdersService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService
  ) {}

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getDeliveredOrderList();

    this.cols = [
      { field: 'orderId', show: true, headers: 'Order Id' },
      { field: 'orderNo', show: true, headers: 'Order No' },
      { field: 'orderDate', show: true, headers: 'Order Date' },
      { field: 'customerId', show: true, headers: 'Customer Id' },
      { field: 'deliveryStatus', show: true, headers: 'Delivery Status' },
    ];
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  deleteOrder(order: number) {
    this.ngxLoader.start();
    this.orderService.deleteDeliveredOrder(order).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('delivered order deleted successfully', 'order deleted');
        this.getDeliveredOrderList();
      }
    });
  }
  getDeliveredOrderList() {
    this.orderService.getDeliveredOrderList().subscribe((data) => {
      this.deliveredOrder = data;
      this.ngxLoader.stop();
    });
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.deliveredOrder);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "order");
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
    this.orderValue = this.deliveredOrder
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.orderValue
           });
            doc.save('order.pdf');
        }

}
