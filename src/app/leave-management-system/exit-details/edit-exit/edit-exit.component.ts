import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-exit',
  templateUrl: './edit-exit.component.html',
  styleUrls: ['./edit-exit.component.scss']
})
export class EditExitComponent {
  selectForm: FormGroup;
  id:any
  payload:any
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private activatedRoute:ActivatedRoute,
    private route: Router) {

      this.activatedRoute.queryParamMap.subscribe(params => {
        this.id = params.get('id');
      })
    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      emoloyeeId:[''],
      employeeName: ['',[Validators.required] ],
      interviewerType: ['',[Validators.required, ]],
      reasonForLeaving: ['',[Validators.required, ]],
      workingOrganization: ['',[Validators.required]],
      mostTheCompany: ['',[Validators.required]],
      improveStaffWelfare: ['', [Validators.required]],
      anythingShare: ['', [Validators.required]],
      allAssets: ['',[Validators.required]],
      noticePeriod:['',[Validators.required]],
      manager:['',[Validators.required]],
    });
 }

 getExitDetail(){
  this.leaveservice.getExitById(this.id).subscribe((res)=>{
    console.log("patched value exit " + res)
  this.selectForm.patchValue({
    emoloyeeId:res.emoloyeeId,
    employeeName:res.employeeName,
    interviewerType:res.interviewerType,
    reasonForLeaving:res.reasonForLeaving,
    workingOrganization:res.workingOrganization,
    mostTheCompany:res.mostTheCompany,
    improveStaffWelfare:res.improveStaffWelfare,
    anythingShare:res.anythingShare,
    allAssets:res.allAssets,
    noticePeriod:res.noticePeriod,
    manager:res.manager,
  })
  })
  }

  ngOnInit(){
    this.getExitDetail()
  }


  submit(){
    this.payload={
      _id: this.id,
      username: localStorage.getItem("email"),
      employeeName:this.selectForm.controls["employeeName"].value,
      interviewerType:this.selectForm.controls["interviewerType"].value,
      reasonForLeaving:this.selectForm.controls["reasonForLeaving"].value,
      workingOrganization:this.selectForm.controls["workingOrganization"].value,
      mostTheCompany: this.selectForm.controls['mostTheCompany'].value,
      improveStaffWelfare:this.selectForm.controls["improveStaffWelfare"].value,
      anythingShare:this.selectForm.controls["anythingShare"].value,
      allAssets:this.selectForm.controls["allAssets"].value,
      noticePeriod:this.selectForm.controls["noticePeriod"].value,
      manager:this.selectForm.controls["manager"].value,
    }
    console.log(this.payload)
    this.leaveservice.editExitList(this.payload,this.id).subscribe((res)=>{
      if(res)
      {
        this.route.navigate(['/exitmgmt/exit-list'])
      }
    })

  }
}
