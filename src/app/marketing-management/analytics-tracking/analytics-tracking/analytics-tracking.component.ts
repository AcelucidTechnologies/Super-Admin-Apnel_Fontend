import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analytics-tracking',
  templateUrl: './analytics-tracking.component.html',
  styleUrls: ['./analytics-tracking.component.scss']
})
export class AnalyticsTrackingComponent implements OnInit {
trackingForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  submitForm(){
    
  }

}
