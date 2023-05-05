import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { OrdersService } from 'src/app/_services/orders.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { order } from 'src/app/_models/order';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  cols!: TABLE_HEADING[];
  deliveredOrder: order[] = [];
  exportColumns:any[];
  pendingValue:any[];
  fgsType: any;

  constructor(private orderService: OrdersService,  private ngxLoader: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();

    this.cols = [
      { field: 'orderId', show: true, headers: 'Order Id' },
      { field: 'orderNo', show: true, headers: 'Order No' },
      { field: 'orderDate', show: true, headers: 'Order Date' },
      { field: 'customerId', show: true, headers: 'Customer Id' },
      { field: 'deliveryStatus', show: true, headers: 'Delivery Status' },
    ];
  }

  getDeliveredOrderList() {
    this.orderService.getDeliveredOrderList().subscribe((data) => {
      this.deliveredOrder = data;
      this.ngxLoader.stop();
      // console.log("deliveredOrder" + JSON.stringify(this.deliveredOrder))
    });
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.deliveredOrder);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "pending");
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
    this.pendingValue = this.deliveredOrder
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.pendingValue
           });
            doc.save('pending.pdf');
        }


}
