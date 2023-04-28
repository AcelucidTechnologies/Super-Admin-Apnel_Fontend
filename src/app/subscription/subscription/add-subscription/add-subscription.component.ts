import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BANNERSPECIAL } from 'src/app/_models/cms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import bsCustomFileInput from 'bs-custom-file-input';
import { CommonService } from 'src/app/_services/common';
import {SUBSCRIPTION } from 'src/app/_models/subscription';
import { MarketingService } from 'src/app/_services/marketing';
import { SubscriptionService } from 'src/app/_services/subscription.service';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
subscriptionForm: FormGroup;
sidebarSpacing: any;
  title: string = " "
  fgsType: any;
  status= false;
  id: any;
  
  editMode: boolean = false
  payload: SUBSCRIPTION;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  //public Editor = customBuild;
  public config={
    toolbar:['heading','|','bold','italic','custombutton'],
    language: 'en'
  }
  //var plainText = content.replace(/<[^>]*>/g, '');
  
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  
  constructor(private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private subscriptionService: SubscriptionService,
    private common: CommonService
    ) {
      this.subscriptionForm = this.fb.group({
        id:['',],
        customerName: ['', [Validators.required]],
        planName: ['', [Validators.required]],
        planInDays: ['',[Validators.required]],
        addons: ['', [Validators.required]],
        description: ['',],
        planDuration: ['',[Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['',[Validators.required]],
        status: ['', [Validators.required]],
        price: ['', [Validators.required]],
        planCode: ['', [Validators.required]],
        billEvery: ['', [Validators.required]],
      })
     }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    bsCustomFileInput.init();
    //this.myCkeditorConfig = this.common.getConfig(150,400);
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Subscription"
        this.getBannerById();
      } else {
        this.editMode = false
        this.title = "Add Subscription"
      }
    });

  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      / show cropper /
  }
  cropperReady() {
      / cropper ready /
  }
  loadImageFailed() {
      / show message /
  }
  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  submitForm(){
   this.payload = {
    id: this.subscriptionForm.controls['id'].value,
    planName: this.subscriptionForm.controls['planName'].value,
    planCode: this.subscriptionForm.controls['planCode'].value,
    price: this.subscriptionForm.controls['price'].value,
    billEvery: this.subscriptionForm.controls['billEvery'].value,
    planInDays:this.subscriptionForm.controls['planInDays'].value,
    customerName: this.subscriptionForm.controls['customerName'].value,
    addons: this.subscriptionForm.controls['addons'].value,
    planDuration: this.subscriptionForm.controls['planDuration'].value,
    startDate: this.subscriptionForm.controls['startDate'].value,
    endDate:this.subscriptionForm.controls['endDate'].value,
    status:this.subscriptionForm.controls['status'].value,
    discription:this.subscriptionForm.controls['discription'].value,
  }
 
  this.ngxLoader.start();
  if (this.editMode) {
  this.editBanner();
  } else {
   // this.addCategory()
  }
  this.route.navigate[('/subscription/subscription-List')]
  
  }

  // addCategory() {
  //   this.markettingService(this.subscriptionForm.value).subscribe(res => {
  //      if (res) {
  //        this.toastr.showSuccess("Special banner added successfully", "banner Added")
  //        this.ngxLoader.stop()
  //        this.route.navigate(['/cms/banner'])
  //      }
  //      (error: any) => {
  //        this.toastr.showError("Somthing wrong Please check", "Error occured")
  //        this.ngxLoader.stop()
  //       this.route.navigate(['/'])
  //      }
  //    })
  //  }

   editBanner(){
    console.log(this.payload)
    this.subscriptionService.editBooking(this.subscriptionForm.value, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Banner edit successfully", "banner edit")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/banner'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }

   getBannerById() {
    this.subscriptionService.getSubscriptionById(this.id).subscribe((res: SUBSCRIPTION) => {
      this.subscriptionForm.patchValue({
        id: res.id,
        customerName: res.customerName,
       planName: res.planName,
       addons: res.addons,
       planDuration: res.id,
       startDate: res.customerName,
       endDate: res.endDate,
       status: res.status,
       planCode: res.planCode,
       price: res.price,
       billEvery: res.billEvery,
       discription: res.discription,
       planInDays:res.planInDays
      })
      this.ngxLoader.stop();
    })
  }

}
