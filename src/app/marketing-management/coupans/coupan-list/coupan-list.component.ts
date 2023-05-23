import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL, FEATURE } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';

import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'
import { MarketingService } from 'src/app/_services/marketing';
import { COUPANCODEDATA } from 'src/app/_models/marketingModule';
import { CoupanDialogComponent } from '../coupan-dialog/coupan-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coupan-list',
  templateUrl: './coupan-list.component.html',
  styleUrls: ['./coupan-list.component.scss']
})
export class CoupanListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  coupanList : any[]=[]
  accessPermission:access
  productDetails:any[];
  exportColumns: any[];
  customers: COUPANCODEDATA[]=[]

  selectedProduct: COUPANCODEDATA[]=[]
  statuses: any[];

  activityValues: number[] = [0, 100];

  constructor(private ngxLoader: NgxUiLoaderService,
    private CmsService: CmsService,
    private markettingService: MarketingService,
    private toastr: ToastrMsgService,
    public dialog: MatDialog,
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
      { field: 'couponName', show: true, headers: 'Coupon Name' },
      { field: 'couponCode', show: true, headers: 'Coupon Code' },
      { field: 'discount', show: true, headers: 'Discount' },
    ]
    this.exportColumns = this.cols.map(col => ({title: col.headers,dataKey: col.field}))
    this.getMarkettingList();
  }

  getMarkettingList(){
    this.markettingService.getCouponsList().subscribe((res: COUPANCODEDATA[]) => {
      this.coupanList = res
      console.log(this.coupanList,"coupan list--------------------")
      this.ngxLoader.stop();
    })
  }

  deleteProduct(couponList: any) {
    this.ngxLoader.start();
    console.log("1 delte button");
    this.markettingService.deleteCoupan(couponList._id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Coupan deleted successfully", "Coupon delete")
        this.getMarkettingList();
      }
    })
  }

  openDialog(deleteList: any) {
    const dialogRef = this.dialog.open(CoupanDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteProduct(deleteList)
      }
    });
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  exportPdf() {
    this.productDetails = this.coupanList
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.productDetails
           });
            doc.save('coupons.pdf');
        }

        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.coupanList);
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
