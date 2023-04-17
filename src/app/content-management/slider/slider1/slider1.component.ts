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
  accessPermission:access

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
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
   
    this.cols = [
      { field: 'image', show: true, headers: 'Image' },
      { field: 'url', show: true, headers: 'URL' },
      { field: 'description', show: true, headers: 'Description' },
      { field: 'sortby', show: true, headers: 'Sort By' },
      { field: 'action', show: true, headers: 'Action' },
    ]
    this.getSliderList();

  }
  
  getSliderList() {
    this.CmsService.getSliderList().subscribe((res: SLIDER[]) => {
      this.sliderList = res
      //console.log(this.bannerList,"--------------------")
      this.ngxLoader.stop();
    })
  }

  deleteSlider(sliderList: any) {
    this.ngxLoader.start();
    this.CmsService.deleteSlider(sliderList.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("bannerSpecial deleted successfully", "banner delete")
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
}
