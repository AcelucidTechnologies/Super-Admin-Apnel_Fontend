import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { COUPANCODEDATA } from 'src/app/_models/marketingModule';
import { MarketingService } from 'src/app/_services/marketing';
import { log } from 'console';

@Component({
  selector: 'app-add-coupan',
  templateUrl: './add-coupan.component.html',
  styleUrls: ['./add-coupan.component.scss']
})
export class AddCoupanComponent implements OnInit {
  coupanForm: FormGroup;
  sidebarSpacing: any;
  fgsType: any;
  title: string = " "
  imageChangedEvent: any = '';
  id: any;
  payload: COUPANCODEDATA;
  editMode: boolean = false
  reg= '([A-Za-z0-9]+)';
  dateFieldDate: Date = new Date();

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService,
    private markettingService : MarketingService
    ) {
    this.coupanForm = this.fb.group({
      id:[''],
      coupanName: ['', [Validators.required]],
      coupanCode: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      maxDiscount: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      product: ['', [Validators.required]],
      status: ['',],
      usesPerCoupan: ['', [Validators.required]],
     // quantity: ['', [Validators.required,Validators.pattern("(\[0-9]{0,9})?")]],
    })
    console.log(this.coupanForm)
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Coupan"
        this.getFeatureById()
      } else {
        this.editMode = false
        this.title = "Add New Coupan Name"
      }
    });
  }

  submitForm(){
    console.log("1234567890",this.coupanForm.value);
    
    this.payload = {
      id: this.coupanForm.controls['id'].value,
      coupanName: this.coupanForm.controls['coupanName'].value,
      coupanCode: this.coupanForm.controls['coupanCode'].value,
      type: this.coupanForm.controls['type'].value,
      startDate: this.coupanForm.controls['startDate'].value,
      endDate: this.coupanForm.controls['endDate'].value,
      discount: this.coupanForm.controls['discount'].value,
      category: this.coupanForm.controls['category'].value,
      products: this.coupanForm.controls['product'].value,
      status: this.coupanForm.controls['status'].value,
      usesPerCoupan: this.coupanForm.controls['usesPerCoupan'].value,
      maxDiscount: this.coupanForm.controls['maxDiscount'].value
    }

  this.ngxLoader.start();
  if (this.editMode) {
  this.editCoupan()
  } else {
    this.addCoupan()
  }
  this.route.navigate[('/marketing/coupanList')]
  }

  addCoupan() {
    this.markettingService.addCoupon(this.coupanForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Coupan added successfully", "Coupan Added")
         this.ngxLoader.stop()
         this.route.navigate(['/marketing/coupanList'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
        // this.route.navigate(['/'])
       }
     })
   }

   editCoupan(){
    console.log(this.payload)
    this.markettingService.editCoupon(this.coupanForm.value, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Coupan edit successfully", "Coupan edit")
        this.ngxLoader.stop()
        this.route.navigate(['/marketing/coupanList'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }

   getFeatureById() {
    console.log("dfghjkldfghjk");
    
    this.markettingService.getcoupanById(this.id).subscribe((res:COUPANCODEDATA) => {
      this.coupanForm.patchValue({
        id: res.id,
        coupanName: res.coupanName,
       // image: res.image,
       startDate: res.startDate,
       coupanCode: res.coupanCode,
       endDate: res.endDate,
       maxDiscount: res.maxDiscount,
       discount: res.discount,
       category: res.category,
       product: res.products,
       status: res.status,
       usesPerCoupan: res.usesPerCoupan,
      })
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

}
