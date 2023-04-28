import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { product } from 'src/app/_models/catalog';
import { Table } from 'primeng/table';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { access } from 'src/app/_models/modulepermission';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import * as xlsxPackage from 'xlsx'
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  productList:product []
  fgsType: any;
  productDetails:any[];
  exportColumns: any[];
  accessPermission:access
  constructor(private ngxLoader: NgxUiLoaderService,
    private ProductService: ProductService,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService,
    public dialog: MatDialog,
       ){
        this.permissionService.getModulePermission().subscribe(res=>{
          this.accessPermission=res[0].CatalogProduct
          console.log( this.accessPermission)
        })
     }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.sidebarSpacing = 'contracted';
    this.cols = [
      { field: '_id', show: true, headers: 'ProductId' },
      { field: 'name', show: true, headers: 'ProductName' },
      { field: 'category', show: true, headers: 'Category' },
      { field: 'country_origin', show: true, headers: 'Brand' },
      { field: 'price', show: true, headers: 'Price' },
      { field: 'Quantity', show: true, headers: 'Quantity' },
      { field: 'Status', show: true, headers: 'Status' },
    ]
    this.getProductList()
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
  getProductList() {
    this.ProductService.getProductList().subscribe((res:product[]) => {
      this.productList = res
      console.log(res[0])
      this.ngxLoader.stop();
    })
  }



  // deleteProduct(id: any) {
  //   console.log(id)
  //   this.ngxLoader.start();
  //   this.ProductService.deleteProduct(id).subscribe(res => {
  //     if (res) {
  //       this.toastr.showSuccess("Product deleted successfully", "Product delete")
  //       this.getProductList()
  //     }
  //   })
  // }
    deleteProduct(productList: any) {
    console.log("hello" + JSON.stringify(productList))
    this.ngxLoader.start();
    this.ProductService.deleteProduct(productList).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Product deleted successfully", "Product delete")
        this.getProductList()
      }
    })
  }




  // search functionality start here
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  openDialog(productList: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteProduct(productList)
      }
    });
  }

  exportExcel() {
    const worksheet = xlsxPackage.utils.json_to_sheet(this.productList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "product");
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
    this.productDetails = this.productList
            const doc = new jsPDF
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.productDetails
           });
            doc.save('ProductList.pdf');
        }
}
