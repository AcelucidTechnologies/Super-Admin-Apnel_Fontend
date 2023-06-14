import { Component, OnInit, ViewChild } from '@angular/core';
import { BANNERSPECIAL } from 'src/app/_models/cms';
import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';
import { DialogComponent } from 'src/app/leads/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BannerDialogComponent } from '../banner-dialog/banner-dialog.component';
import { log } from 'console';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx';
import { ApiResponse } from 'src/app/_models/cms';


@Component({
  selector: 'app-banner-special',
  templateUrl: './banner-special.component.html',
  styleUrls: ['./banner-special.component.scss'],
  providers: []
})
export class BannerSpecialComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  fgsType: any;
  bannerList: any[]=[]
  banner: any[]=[]
  accessPermission:access
  bannerList1:any[]=[]
  bannerDetails:any[];
  exportColumns: any[];
  id:string
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Banner/";
  // ----------------------------

  customers: BANNERSPECIAL[];

  selectedCustomers: BANNERSPECIAL[];


  statuses: any[];


  activityValues: number[] = [0, 100];


  // --------------------------------

  constructor(private ngxLoader: NgxUiLoaderService,
    private CmsService: CmsService,
    private toastr: ToastrMsgService,

    private permissionService:ModulePermissionService,
    public dialog: MatDialog) {
      this.fgsType = SPINNER.squareLoader;
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].CmsBanner

      })


     }


  ngOnInit(): void {

    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';

    this.cols = [
      { field: 'bannerName', show: true, headers: 'Banner Image' },
      { field: 'bannerDescription', show: true, headers: ' Banner Description' },
      { field: 'bannerOrder', show: true, headers: 'Sort By' },
    ]
    this.exportColumns = this.cols.map(col => ({title: col.headers,dataKey: col.field}))
    this.getbannerList();
    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
  }

  getbannerList() {
    this.CmsService.getSpecialBannerList(this.id).subscribe((res) => {
      this.bannerList =res
      this.bannerList = res.map((item) => {
              const cleanResponse = item.bannerDescription.replace(/<\/?p>/g, '');
              return { ...item, bannerDescription: cleanResponse };
            });


      this.ngxLoader.stop();
    })
  }

  deleteBanner(bannerList: any) {

    this.ngxLoader.start();

    this.CmsService.deleteSpecialBanner(bannerList._id).subscribe(res => {
      if (res) {

        this.toastr.showSuccess("bannerSpecial deleted successfully", "banner delete")
        this.getbannerList()
      }
    })
  }
  openDialog(deleteList: any) {
    const dialogRef = this.dialog.open(BannerDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteBanner(deleteList)
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

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }



        exportPdf() {
          this.bannerDetails = this.bannerList;
          const doc = new jsPDF.jsPDF('l', 'pt');
          const data = this.bannerDetails  // replace with actual property names
          autoTable(doc, {
            columns: this.exportColumns,
            body: data
          });
          doc.save('banner.pdf');
        }



        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.banner);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsxPackage.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Bannner");
        }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


}
