import { Component, OnInit, ViewChild } from '@angular/core';

import { TABLE_HEADING } from 'src/app/_models/table_heading';
import { Table } from 'primeng/table';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';
import { CmsService } from '../../../_services/cms.service';
import { access } from 'src/app/_models/modulepermission';
import { DialogComponent } from 'src/app/leads/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SLIDER } from 'src/app/_models/slider';
import { SliderDialogComponent } from '../slider-dialog/slider-dialog.component';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as FileSaver from 'file-saver';
import * as xlsxPackage from 'xlsx'
//import { BannerDialogComponent } from '../banner-dialog/banner-dialog.component';

@Component({
  selector: 'app-slider1',
  templateUrl: './slider1.component.html',
  styleUrls: ['./slider1.component.scss']
})
export class Slider1Component implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  sidebarSpacing: any;
  cols!: TABLE_HEADING[];
  fgsType: any;
  sliderList: SLIDER[]=[]
  accessPermission:access;
  exportColumns: any[];
  sliderDetails:any[];
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Slider/";

  // ----------------------------

  customers: SLIDER[];

  selectedCustomers: SLIDER[];

  statuses: any[];

  activityValues: number[] = [0, 100];

  constructor(private ngxLoader: NgxUiLoaderService,
    private CmsService: CmsService,
    private toastr: ToastrMsgService,
    private permissionService:ModulePermissionService,
    public dialog: MatDialog) {
      this.permissionService.getModulePermission().subscribe(res=>{
        this.accessPermission=res[0].CmsBanner

      })
     }

  ngOnInit(): void {
    this.ngxLoader.stop();
    this.getSliderList();
    this.fgsType = SPINNER.squareLoader

    this.sidebarSpacing = 'contracted';

    this.cols = [
      { field: 'image', show: true, headers: 'Image' },
      { field: 'url', show: true, headers: 'URL' },
      { field: 'description', show: true, headers: 'Description' },
      { field: 'sortby', show: true, headers: 'Sort By' },
      { field: 'action', show: true, headers: 'Action' },
    ]


  }

  getSliderList() {
    this.CmsService.getSliderList().subscribe((res) => {
      this.sliderList = res.map((item) => {
        const cleanResponse = item.sliderDiscription.replace(/<\/?p>/g, '');
        return { ...item, sliderDiscription: cleanResponse };
      });

      this.ngxLoader.stop();
    })
  }



  deleteSlider(sliderList: any) {
    this.ngxLoader.start();
    this.CmsService.deleteSlider(sliderList._id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Slider deleted successfully", "Slider delete")
        this.getSliderList()
      }
    })
  }

  openDialog(deleteList: any) {
    const dialogRef = this.dialog.open(SliderDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteSlider(deleteList)
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

     //Search functionality start here
     applyFilterGlobal($event, stringVal) {
      this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

  exportPdf() {
    this.sliderDetails = this.sliderList
            const doc = new jsPDF.jsPDF('l', 'pt');
           autoTable(doc, {
            columns:this.exportColumns,
            body:this.sliderDetails
           });
            doc.save('products.pdf');
        }

        exportExcel() {
          const worksheet = xlsxPackage.utils.json_to_sheet(this.sliderList);
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

}
