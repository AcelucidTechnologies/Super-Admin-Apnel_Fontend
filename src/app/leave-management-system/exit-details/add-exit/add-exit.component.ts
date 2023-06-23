import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-exit',
  templateUrl: './add-exit.component.html',
  styleUrls: ['./add-exit.component.scss']
})
export class AddExitComponent {
  selectForm: FormGroup;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {

    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      leaveType: ['',[Validators.required] ],
      fromDate: ['',[Validators.required, ]],
      toDate: ['',[Validators.required, ]],
      contactNo: ['',[Validators.required,  Validators.pattern(/^\d{10}$/)]],
      altConatctNo: ['',  [Validators.pattern(/^\d{10}$/)]],
      reason: ['', [Validators.required]],
      image: [''],
      appliedTo: ['',[Validators.required]],
      subject:['',[Validators.required]]

    });


 }

 submit(){

 }


}
