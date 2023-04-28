import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL, FEATURE } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';

import { access } from 'src/app/_models/modulepermission';

import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'
import { BookingService } from 'src/app/_services/booking.service';
import { BOOKING, PRODUCTS } from 'src/app/_models/booking';

@Component({
  selector: 'app-booking-order-list',
  templateUrl: './booking-order-list.component.html',
  styleUrls: ['./booking-order-list.component.scss']
})
export class BookingOrderListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  bookingList : BOOKING[]=[]
  accessPermission:access
  productDetails:any[];
  exportColumns: any[];
  customers:BOOKING[]=[]

  selectedProduct: BOOKING[]=[]

  productList : PRODUCTS[]=[]
  customer:PRODUCTS[]=[]
  
  constructor(private ngxLoader: NgxUiLoaderService,
    private bookingService: BookingService,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{ 
        this.accessPermission=res[0].CmsBanner
        console.log( this.accessPermission)
      })
     }

  ngOnInit(): void {
    this.sidebarSpacing = 'contracted';
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.cols = [
      { field: 'image', show: true, headers: 'Image' },
      { field: 'product name', show: true, headers: 'Product Name' },
      { field: 'Modal', show: true, headers: 'Modal' },
      { field: 'price', show: true, headers: 'Price' },
      { field: 'quantity', show: true, headers: 'Quantity' },
    ]
    this.getbookingList();
    //this.getProductList();
  }

  getbookingList(){
    this.bookingService.getBookingOrderList().subscribe((res: BOOKING[]) => {
      this.bookingList = res
      //console.log(this.bannerList,"--------------------")
      this.ngxLoader.stop();
    })
  }



  // deleteProduct(bookingList: any) {
  //   this.ngxLoader.start();
  //   this.CmsService.deleteProduct(bookingList.id).subscribe(res => {
  //     if (res) {
  //       this.toastr.showSuccess("Feature Product deleted successfully", "Feature Product delete")
  //       this.getbookingList()
  //     }
  //   })
  // }

  // openDialog(deleteList: any) {
  //   const dialogRef = this.dialog.open(DialogFeatureComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == true) {
  //       this.deleteProduct(deleteList)
  //     }
  //   });
  // }
  
  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  exportPdf() {
    this.productDetails = this.bookingList
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.productDetails
           });
            doc.save('products.pdf');
        }

        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.bookingList);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "leads");
        }   
        
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
