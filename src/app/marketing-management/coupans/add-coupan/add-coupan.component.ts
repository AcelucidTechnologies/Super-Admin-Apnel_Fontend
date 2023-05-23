import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
// import { COUPANCODEDATA } from 'src/app/_models/marketingModule';
import { MarketingService } from 'src/app/_services/marketing';

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
  payload: any;
  editMode: boolean = false
  reg= '([A-Za-z0-9]+)';
  dateFieldDate: Date = new Date();
  type: string[];
  update: any;

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private markettingService : MarketingService
    ) {
    this.coupanForm = this.fb.group({
      couponName: ['', [Validators.required]],
      couponCode: ['', [Validators.required]],
      coupontype: ['', [Validators.required]],
      discount: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      maxDiscount: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      category: ['', [Validators.required]],
      product: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      username:[''],
      usesPerCoupon: ['', [Validators.required]],
      userPerCoupon: ['', [Validators.required]]

    })
    console.log(this.coupanForm)
  }
  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Coupon"
        this.update= "Update"
        this.getCouponById()
      } else {
        this.editMode = false
        this.title = "Add New Coupon Name"
        this.update= "Save"
      }
    });
    this.type=["Flat","Percentage(%)"]
  }


  submitForm(){
    this.ngxLoader.start();
    this.coupanForm.patchValue({
      username: localStorage.getItem('email')|| ''
    });

    this.payload = {
      username: this.coupanForm.controls['username'].value,
      couponName: this.coupanForm.controls['couponName'].value,
      couponCode: this.coupanForm.controls['couponCode'].value,
      coupontype: this.coupanForm.controls['coupontype'].value,
      discount: this.coupanForm.controls['discount'].value,
      maxDiscount: this.coupanForm.controls['maxDiscount'].value,
      category: this.coupanForm.controls['category'].value,
      product: this.coupanForm.controls['product'].value,
      startDate: this.coupanForm.controls['startDate'].value,
      endDate: this.coupanForm.controls['endDate'].value,
      usesPerCoupon: this.coupanForm.controls['usesPerCoupon'].value,
      userPerCoupon: this.coupanForm.controls['userPerCoupon'].value,

    }

  if (this.editMode) {
  this.editCoupan()
  } else {
    this.addCoupan()
  }
  // this.route.navigate[('/marketing/coupanList')]
  }

  addCoupan() {
    this.markettingService.addListCoupon(this.coupanForm.value).subscribe(res => {
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
    console.log("edit payload"+JSON.stringify(this.payload))
    this.markettingService.editListsCoupan(this.payload, this.id).subscribe(res => {
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




   getCouponById() {
    this.markettingService.getcoupanById(this.id).subscribe((res) => {
      const testapi = res
      console.log("testapis for getcouponbyid" +  JSON.stringify(testapi))
      const startDate = new Date(res.startDate);
      const endDate = new Date(res.endDate);
      this.coupanForm.patchValue({
        _id: res._id,
        username: res.username,
        couponName: res.couponName,
        couponCode: res.couponCode,
        startDate: startDate,
        endDate: endDate,
        maxDiscount: res.maxDiscount,
        coupontype: res.coupontype,
        discount: res.discount,
        category: res.category,
        product: res.product,
        usesPerCoupon: res.usesPerCoupon,
        userPerCoupon: res.userPerCoupon
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
