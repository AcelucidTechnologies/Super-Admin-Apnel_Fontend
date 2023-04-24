import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent implements OnInit {
  liveChatForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.liveChatForm= this.fb.group({
      propertyId: ['', Validators.required]
    })
  }

  submitForm(){

  }
}
