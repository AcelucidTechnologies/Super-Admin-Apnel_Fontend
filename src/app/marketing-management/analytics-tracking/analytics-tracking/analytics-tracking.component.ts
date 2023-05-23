import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MarketingService } from 'src/app/_services/marketing';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-analytics-tracking',
  templateUrl: './analytics-tracking.component.html',
  styleUrls: ['./analytics-tracking.component.scss']
})
export class AnalyticsTrackingComponent implements OnInit {
trackingForm: FormGroup;
googleTrackingForm: FormGroup;
payload:any;
constructor(private fb: FormBuilder,
  private toastr: ToastrMsgService,
  private markettingService : MarketingService,
  private route: Router,
  private ngxLoader: NgxUiLoaderService,) { }
  ngOnInit(): void {
    this.trackingForm= this.fb.group({
      metaAnalyticsKey: ['', Validators.required]
    })

    this.googleTrackingForm= this.fb.group({
      googleAnalyticskey: ['', Validators.required]
    })


  }
  submitMeta(){
    this.payload = {
      username: localStorage.getItem("email"),
      metaAnalyticsKey: this.trackingForm.controls['metaAnalyticsKey'].value,
    }
    this.ngxLoader.start();
    this.addMetaKey();
  }

  addMetaKey() {
    this.markettingService.metaAnalytics(this.payload).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Meta Anaylyis added successfully", "")
         this.ngxLoader.stop()
         this.trackingForm.reset();
        //  this.route.navigate(['/marketing/analytics-tracking'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured");
         this.ngxLoader.stop();
       }
     })
   }


   submitGoogle(){
    this.payload = {
      username: localStorage.getItem("email"),
      googleAnalyticskey: this.googleTrackingForm.controls['googleAnalyticskey'].value,
    }
    this.ngxLoader.start();
    this.addGoogleKey();
  }

  addGoogleKey() {
    this.markettingService.googleAnalytics(this.payload).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Google Anaylyis added successfully", "")
         this.ngxLoader.stop()
         this.googleTrackingForm.reset();
        //  this.route.navigate(['/marketing/analytics-tracking'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured");
         this.ngxLoader.stop();
       }
     })
   }
}
