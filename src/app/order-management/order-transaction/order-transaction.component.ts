import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { OrdersService } from 'src/app/_services/orders.service';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { orderTransactin } from 'src/app/_models/order';
import { Table } from 'primeng/table';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderStatusComponent } from '../dialog-order-status/dialog-order-status.component';

@Component({
  selector: 'app-order-transaction',
  templateUrl: './order-transaction.component.html',
  styleUrls: ['./order-transaction.component.scss']
})
export class OrderTransactionComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  fgsType: any;
  cols: TABLE_HEADING[];
  orderTransactin: orderTransactin[] = [];
  accessPermission:access
  exportColumns:any[];
  orderValue:any[];
  order:any

  constructor(private ngxLoader: NgxUiLoaderService,
    private orderService: OrdersService,
    private toastr: ToastrMsgService,
    public dialog: MatDialog,
    private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].OrderTransaction
        console.log( this.accessPermission)
      })
    }

  ngOnInit(): void {
    this.sidebarSpacing = 'contracted';
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.getOrderTransactionList()
    this.cols = [
      { field: 'Order Status', show: true, headers: 'Order Status' },
      { field: 'Name', show: true, headers: 'Name' },
    ]
  }
  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  getOrderTransactionList() {
    this.orderService.getOrderTransaction().subscribe((data) => {
      this.orderTransactin = data
      this.ngxLoader.stop();
      console.log("orderlist" + JSON.stringify(this.orderTransactin))
    });
  }
  deteOrderTransactionBy(orderId: number) {
    this.ngxLoader.start();
    this.orderService.deteOrderTransactionById(orderId).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('orders-transaction deleted successfully', 'order deleted');
        this.getOrderTransactionList();
      }
    });
  }
  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.orderTransactin);
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
    this.orderValue = this.orderTransactin
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.orderValue
           });
            doc.save('order.pdf');
        }

        openDialog(order: any) {
          const dialogRef = this.dialog.open(DialogOrderStatusComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
              this.deteOrderTransactionBy(order)
            }
          });
        }
}
