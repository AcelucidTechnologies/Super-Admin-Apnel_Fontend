import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MarketingService } from 'src/app/_services/marketing';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  liveChatForm: FormGroup;
  payload: any;
  constructor(
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private markettingService: MarketingService,
    private route: Router,
    private toastr: ToastrMsgService
  ) {}

  ngOnInit(): void {
    this.liveChatForm = this.fb.group({
      propertyId: ['', Validators.required],
    });
  }

  submitForm() {
    this.payload = {
      username: localStorage.getItem('email'),
      propertyId: this.liveChatForm.controls['propertyId'].value,
    };
    this.addPropertyId();
  }

  addPropertyId() {
    this.markettingService.liveChat(this.payload).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Property Id added successfully',
          'Property Id Added'
        );
        this.ngxLoader.stop();
        this.liveChatForm.reset();
      }
      (error: any) => {
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
      };
    });
  }
}
