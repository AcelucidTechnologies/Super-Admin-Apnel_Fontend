import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';
import { log } from 'console';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'
import { SUBSCRIPTION } from 'src/app/_models/subscription';
import { SubscriptionService } from 'src/app/_services/subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  fgsType: any;
  subscriptionList: SUBSCRIPTION[]=[]
  accessPermission:access
  subscriptionDetails:any[];
  exportColumns: any[];
  // ----------------------------

  customers: SUBSCRIPTION[]=[]

  selectedCustomers: SUBSCRIPTION[]=[]

  constructor(private ngxLoader: NgxUiLoaderService,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService) {
      this.permissionService.getModulePermission().subscribe(res=>{ 
        this.accessPermission=res[0].CmsBanner
       
      })
     }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
   
    // this.cols = [
    //   { field: 'bannerimage', show: true, headers: 'Banner Image' },
    //   { field: 'url', show: true, headers: 'URL' },
    //   { field: 'description', show: true, headers: 'Description' },
    //   { field: 'sortby', show: true, headers: 'Sort By' },
    // ]
    // this.exportColumns = this.cols.map(col => ({title: col.headers,dataKey: col.field}))
    this.getSubscriptionList();

    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
  }
  
  getSubscriptionList() {
    this.subscriptionService.getSubscriptionList().subscribe((res: SUBSCRIPTION[]) => {
      this.subscriptionList = res
      //console.log(this.bannerList,"--------------------")
      this.ngxLoader.stop();
    })
  }

  deleteBanner(subscriptionList: any) {
    this.ngxLoader.start();
    console.log("1");
    this.subscriptionService.deleteSubsription(subscriptionList.id).subscribe(res => {
      if (res) {
        
        this.toastr.showSuccess("bannerSpecial deleted successfully", "banner delete")
        this.getSubscriptionList()
        
      }
    })
  }

  // openDialog(deleteList: any) {
  //   const dialogRef = this.dialog.open(BannerDialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == true) {
  //       this.deleteBanner(deleteList)
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

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // exportPdf() {
  //   this.bannerDetails = this.bannerList
  //           const doc = new jsPDF.jsPDF('l', 'pt');
  //          autoTable(doc, {
  //           columns:this.exportColumns,
  //           body:this.bannerDetails
  //          });
  //           doc.save('products.pdf');
  //       }

  //       exportExcel() {
  //         const worksheet = xlsxPackage.utils.json_to_sheet(this.bannerList);
  //         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //         const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
  //         this.saveAsExcelFile(excelBuffer, "leads");
  //       }   
        
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

}
