import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MarketingService } from 'src/app/_services/marketing';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {
  pushNotificationForm: FormGroup;
  payload: any;
  constructor(private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private markettingService : MarketingService,
    private route: Router,
    private ngxLoader: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.pushNotificationForm= this.fb.group({
      apiId: ['', Validators.required],
      key: ['', Validators.required],
    })
  }

  submitForm(){
    this.payload = {
      username: localStorage.getItem("email"),
      apiId: this.pushNotificationForm.controls['apiId'].value,
      authenticationkey: this.pushNotificationForm.controls['key'].value,
    }
    this.ngxLoader.start();
    this.addNotification()

  }
  addNotification() {
    this.markettingService.pushNotification(this.payload).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Push Notification added successfully", "Push Notification Added")
         this.ngxLoader.stop()
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()

       }
     })
   }

}
