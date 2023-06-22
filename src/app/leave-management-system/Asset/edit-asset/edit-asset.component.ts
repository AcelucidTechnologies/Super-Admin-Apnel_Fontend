import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent {
  selectForm: FormGroup;
  appliedToType: string[];
  assetlist:any;
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
      employeeName: ['',[Validators.required] ],
      typeOfAssets: ['',[Validators.required]],
      addedBy: ['',[Validators.required]],
      givenDate: ['',[Validators.required]],
      returnDate: ['',  [Validators.required]],
      assetsDetails: ['', [Validators.required]],

    });
 }

 ngOnInit(){

  this.getAssetDetail();

 }
 getAssetDetail(){
  this.leaveservice.getAssetById(this.id).subscribe((res)=>{
  this.selectForm.patchValue({
    employeeName:res.employeeName,
    typeOfAssets:res.typeOfAssets,
    addedBy:res.addedBy,
    givenDate:res.givenDate,
    returnDate:res.returnDate,
    assetsDetails:res.assetsDetails,
  })
  })
  }


submit(){
  this.payload={
    _id: this.id,
    username: localStorage.getItem("email"),
    employeeName:this.selectForm.controls["employeeName"].value,
    typeOfAssets:this.selectForm.controls["typeOfAssets"].value,
    addedBy:this.selectForm.controls["addedBy"].value,
    givenDate:this.selectForm.controls["givenDate"].value,
    returnDate: this.selectForm.controls['returnDate'].value,
    assetsDetails:this.selectForm.controls["assetsDetails"].value,
  }
  console.log(this.payload)
  this.leaveservice.editAssetList(this.payload,this.id).subscribe((res)=>{
    if(res)
    {
      this.route.navigate(['/asset/asset-list'])
    }
  })

}


}
