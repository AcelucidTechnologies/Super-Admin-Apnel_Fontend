import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import bsCustomFileInput from 'bs-custom-file-input';
import { CommonService } from 'src/app/_services/common';
import {SUBSCRIPTION } from 'src/app/_models/subscription';
import { MarketingService } from 'src/app/_services/marketing';
import { SubscriptionService } from 'src/app/_services/subscription.service';

@Component({
  selector: 'app-coupan',
  templateUrl: './coupan.component.html',
  styleUrls: ['./coupan.component.scss']
})
export class CoupanComponent implements OnInit {
  coupanForm: FormGroup;
  sidebarSpacing: any;
  pricingIterval: any;
    fgsType: any;
    id: any;
    associatedPlan: any;
    payload: SUBSCRIPTION;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    //public Editor = customBuild;
    public config={
      toolbar:['heading','|','bold','italic','custombutton'],
      language: 'en'
    }
    
    constructor(private ngxLoader: NgxUiLoaderService,
      private fb: FormBuilder,
      private route: Router,
      private activateRoute: ActivatedRoute,
      private toastr: ToastrMsgService,
      private subscriptionService: SubscriptionService,
      private common: CommonService
      ) {
        this.coupanForm = this.fb.group({
          id:['',],
          coupanName: ['', [Validators.required]],
          couponCode: ['', [Validators.required]],
          associatedPlan: [''],
          oneTime: ['',],
          associatedPlans:[''],
          associatedAddons: [''],
          validUpto:[''],
          maximumRedemption:['']
        })

        this.associatedPlan=['basic','advanced']
       }
  
    ngOnInit(): void {
      this.fgsType = SPINNER.squareLoader
      this.ngxLoader.start();
      bsCustomFileInput.init();
      this.sidebarSpacing = 'contracted';
      this.activateRoute.queryParamMap.subscribe(params => {
      });
  
    }
    onToggleSidebar(sidebarState: any) {
      if (sidebarState === 'open') {
        this.sidebarSpacing = 'contracted';
      } else {
        this.sidebarSpacing = 'expanded';
      }
    }
  
    submitForm(){
       console.log(this.coupanForm.value)
       this.route.navigate[('/subscription/subscription-list')]
    }
  
}
