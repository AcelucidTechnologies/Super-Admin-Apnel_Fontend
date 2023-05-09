import { order } from 'src/app/_models/order';
import { Component, Input, OnInit,ViewChild} from '@angular/core';
import { cancelOrder } from 'src/app/_models/order';
import { OrdersService } from 'src/app/_services/orders.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TABLE_HEADING } from '../../_models/table_heading'
import { Table } from 'primeng/table';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
 cols!: TABLE_HEADING[];
  cancelOrder: cancelOrder[] = [];
  fgsType: any;
  exportColumns:any[];
  pendingValue:any[];
  @Input() deleteAccess:boolean;
  constructor(
    private orderService: OrdersService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService
  ) {

  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.getCancelOrderList();

    this.cols = [
      { field: 'Return Id', show: true, headers: 'Return Id' },
      { field: 'Order Id', show: true, headers: 'Order Id' },

      { field: 'Customer Name', show: true, headers: 'Customer Name' },
      { field: 'Reason', show: true, headers: 'Reason' },
      { field: 'Type', show: true, headers: 'Type' },

      { field: 'Return status', show: true, headers: 'Return status' },
      { field: 'Return Amount', show: true, headers: 'Return Amount' },
      { field: 'Order Date', show: true, headers: 'Order Date' },
    ]
  }


  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    console.log($event)
  }
  deleteOrder(orderId: number){
    this.ngxLoader.start();
    this.orderService.deleteCancelledOrder(orderId).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('cancel order deleted successfully', 'order deleted');
        this.getCancelOrderList();
      }
    });
  }
  getCancelOrderList(){
    this.orderService.getCancelOrderList().subscribe((data) => {
      this.cancelOrder = data
      this.ngxLoader.stop();
      console.log("cancelorder" +  JSON.stringify(this.cancelOrder))
    });
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.cancelOrder);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "cancelOrder");
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
    this.pendingValue = this.cancelOrder
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.pendingValue
           });
            doc.save('cancelOrder.pdf');
        }
 }
