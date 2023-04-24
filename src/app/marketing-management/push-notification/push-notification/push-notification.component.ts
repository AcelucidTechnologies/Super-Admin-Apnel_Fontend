import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {
  pushNotificationForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pushNotificationForm= this.fb.group({
      apiId: ['', Validators.required],
      key: ['', Validators.required],
    })
  }

  submitForm(){

  }

}
