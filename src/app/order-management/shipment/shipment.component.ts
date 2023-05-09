import { Component, OnInit, ViewChild } from '@angular/core';
import { Shipments } from 'src/app/_models/order';
import { OrdersService } from 'src/app/_services/orders.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TABLE_HEADING } from '../../_models/table_heading'
import { Table } from 'primeng/table';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import * as xlsxPackage from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  Shipments: Shipments[] = [];
  fgsType: any;
  exportColumns:any[];
  shipmentValue:any[];
  accessPermission:access
  constructor(private orderService: OrdersService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].OrderShipment
        console.log( this.accessPermission)
      })
    }

  ngOnInit(): void {
    this.sidebarSpacing = 'contracted';
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.getOrderShippingList()
    this.sidebarSpacing = 'contracted';
    this.cols = [
      { field: 'Order Id', show: true, headers: 'Order Id' },

      { field: 'Customer Name', show: true, headers: 'Customer Name' },
      { field: 'Contact No', show: true, headers: 'Contact No' },
      { field: 'Total', show: true, headers: 'Total' },
      { field: 'Order Date', show: true, headers: 'Order Date' },
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
  getOrderShippingList() {
    this.orderService.getOrderShippingList().subscribe((data) => {
      this.Shipments =  data
     this.ngxLoader.stop();
     console.log("shipment" + JSON.stringify(this.Shipments))
    });
  }
  deleteOrderShipping(shipmentId:number) {
    this.ngxLoader.start();
    this.orderService.deleteOrderShipping(shipmentId).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("shipping  data is  deleted successfully", "order delete")
        this.getOrderShippingList()
      }
    })
  }

exportExcel() {
  const worksheet = xlsxPackage.utils.json_to_sheet(this.Shipments);
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, "shipment");
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
  this.shipmentValue = this.Shipments
          const doc = new jsPDF
         autoTable(doc, {
          columns:this.exportColumns,
          body:this.shipmentValue
         });
          doc.save('shipment.pdf');
      }
}
