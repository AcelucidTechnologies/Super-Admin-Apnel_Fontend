import { Component, OnInit, ViewChild } from '@angular/core';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';
import { MatDialog } from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'
import { ApiResponse, ApiResponseWithResponse, SPECIALOFFER } from 'src/app/_models/cms';
import { DialogSpecialOfferComponent } from '../dialog-special-offer/dialog-special-offer.component';

@Component({
  selector: 'app-special-offer-list',
  templateUrl: './special-offer-list.component.html',
  styleUrls: ['./special-offer-list.component.scss']
})
export class SpecialOfferListComponent implements OnInit {



  @ViewChild('dt') dt: Table | undefined;
  isSpecialProduct = false;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  offerList : any[]=[]
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";

  accessPermission:access
  productDetails:any[];
  exportColumns: any[];
  customers:SPECIALOFFER[]=[]

  selectedOffer: SPECIALOFFER[]=[]
  statuses: any[];

  activityValues: number[] = [0, 100];

  constructor(private ngxLoader: NgxUiLoaderService,
    private CmsService: CmsService,
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
      { field: 'image', show: true, headers: 'Image' },
      { field: 'product name', show: true, headers: 'Product Name' },
      { field: 'Modal', show: true, headers: 'Modal' },
      { field: 'price', show: true, headers: 'Price' },
      { field: 'quantity', show: true, headers: 'Quantity' },
    ]
    this.getofferList();
  }

  getofferList() {
    this.CmsService.getOfferList().subscribe((res:any) => {
      this.offerList = res.response.filter(item=>item.isSpecialProduct === true)
      console.log(res.response.filter(item=>item.isSpecialProduct === true), "offer list--------------------");


      this.ngxLoader.stop();
    });
  }

  deleteProduct(offerList: any) {
    this.ngxLoader.start();
    this.CmsService.deleteOffer(offerList.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Special Product deleted successfully", "Special product delete")
        this.getofferList()
      }
    })
  }

  openDialog(offerList: any) {
    const dialogRef = this.dialog.open(DialogSpecialOfferComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteProduct(offerList)
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
    this.productDetails = this.offerList
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.productDetails
           });
            doc.save('products.pdf');
        }

        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.offerList);
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
