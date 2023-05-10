import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL, FEATURE, SPECIALOFFER } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';
import { MatDialog } from '@angular/material/dialog';
import { DialogFeatureComponent } from '../dialog-feature/dialog-feature.component';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'

@Component({
  selector: 'app-feature-product-list',
  templateUrl: './feature-product-list.component.html',
  styleUrls: ['./feature-product-list.component.scss']
})
export class FeatureProductListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  featureList : FEATURE[]=[]
  accessPermission:access
  productDetails:any[];
  exportColumns: any[];
  customers:FEATURE[]=[]
  offerList : SPECIALOFFER[]=[]
  isSpecialProduct = true;
  isChecked = this.isSpecialProduct;

  selectedProduct: FEATURE[]=[]
  statuses: any[];
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";

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
    this.getFeatureList();
  }

  getFeatureList(){
    if (this.isSpecialProduct) {
    this.CmsService.getFeatureList().subscribe((res) => {
      this.featureList = res
      console.log(this.featureList," feature list--------------------")
      this.ngxLoader.stop();
    })
  }
  else {
    this.CmsService.getOfferList().subscribe((res) => {
      this.offerList = res
      console.log(this.offerList," offer list--------------------")
      this.ngxLoader.stop();
    })
  }
  }

  deleteProduct(featureList: any) {
    this.ngxLoader.start();
    this.CmsService.deleteProduct(featureList._id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Feature Product deleted successfully", "Feature Product delete")
        this.getFeatureList()
      }
    })
  }

  openDialog(deleteList: any) {
    const dialogRef = this.dialog.open(DialogFeatureComponent);
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
    this.productDetails = this.featureList
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.productDetails
           });
            doc.save('products.pdf');
        }

        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.featureList);
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
