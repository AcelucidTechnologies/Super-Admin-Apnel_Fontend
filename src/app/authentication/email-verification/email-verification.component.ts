import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  @Output() forget = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  getdata(){
    this.forget.emit()
  }

}
