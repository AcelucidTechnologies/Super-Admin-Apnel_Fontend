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
import { PAYMENT } from 'src/app/_models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  fgsType: any;
  paymentList: PAYMENT[]=[]
  accessPermission:access
  subscriptionDetails:any[];
  exportColumns: any[];
  // ----------------------------

  customers: PAYMENT[]=[]

  selectedCustomers: PAYMENT[]=[]

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
    this.getPaymentList();

    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
  }
  
  getPaymentList() {
    this.subscriptionService.getPaymentList().subscribe((res: PAYMENT[]) => {
      this.paymentList = res
      console.log(this.paymentList,"--------------------")
      this.ngxLoader.stop();
    })
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



}
