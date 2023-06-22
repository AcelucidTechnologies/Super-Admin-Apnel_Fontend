import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent {
  selectForm: FormGroup;
  appliedToType: string[];
  assetlist:any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {
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

 }
 submit(){
  this.ngxLoader.start();
  this.leaveservice.createAsset(this.selectForm.value).subscribe((res)=>{
    this.assetlist= res;
       if (res) {
        this.ngxLoader.start();
         location.reload()
         this.toastr.showSuccess("Asset added successfully", "Asset Added")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }

  })

   }

}
