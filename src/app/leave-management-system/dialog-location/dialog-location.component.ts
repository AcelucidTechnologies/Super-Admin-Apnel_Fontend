import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../_services/cms.service'
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/_services/leave.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dialog-location',
  templateUrl: './dialog-location.component.html',
  styleUrls: ['./dialog-location.component.scss']
})
export class DialogLocationComponent {

  selectForm: FormGroup;
  payload:any
  pageTitle:string
  pageLink:string
  page: any
  fgsType:any;

  locationList:any;
 constructor(private ngxLoader: NgxUiLoaderService,
   private fb: FormBuilder,
   private toastr: ToastrMsgService,
   public dialog: MatDialog,
   private leaveservice: LeaveService,
   private route: Router) {
   this.selectForm = this.fb.group({
     username: localStorage.getItem("email"),
     location: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z\s]+$/)]],
   });
   this.selectForm.get('location').valueChanges.subscribe((value) => {
    this.checkdesignationValidity(value);
  });
}
 ngOnInit(): void {
   this.fgsType = SPINNER.squareLoader
   this.ngxLoader.start();
   this.ngxLoader.stop();
   this.getLocation();
 }

 submitForm(){
 this.ngxLoader.start();
 this.leaveservice.createLocation(this.selectForm.value).subscribe((res)=>{
   this.page= res;
      if (res) {
       this.ngxLoader.start();
        location.reload()
        this.toastr.showSuccess("Location added successfully", "Location Added")
      }
      (error: any) => {
       console.log("error");
       this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop();
      }
 })

  }
  checkdesignationValidity(enteredLocation: string): void {
    if (this.locationList.includes(enteredLocation)) {
      this.toastr.showError('Location already exists!', 'Error');
    }
  }

  getLocation() {
      this.leaveservice.getLocationList().pipe(
        map((res) => res.map((profile) => profile.location))
      ).subscribe((LocationRes) => {
        this.locationList = LocationRes;
        this.ngxLoader.stop();
      });
    }

}
