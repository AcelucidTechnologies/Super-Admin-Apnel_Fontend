import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss']
})
export class AddTravelComponent {
  selectForm: FormGroup;
  travellist:any;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {

    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      employeeId: ['',[Validators.required] ],
      employeeName: ['',[Validators.required] ],
      journeyDate: ['',[Validators.required, ]],
      returnDate: ['',[Validators.required,this.validateToDate.bind(this) ]],
      travelFrom: ['',[Validators.required]],
      travelTo: ['',[Validators.required]],
      purposeTravel: ['',[Validators.required]],
    });


 }
 getMinimumDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() );
    return currentDate.toISOString().split('T')[0];

}

validateToDate(control: AbstractControl): ValidationErrors | null {
  const returnDate = control.value;
  const journeyDate = this.selectForm?.get('journeyDate')?.value;

  if (!returnDate || !journeyDate || new Date(journeyDate) <= new Date(returnDate)) {
    return null;
  }

  return { invalidreturnDate: true };
}

 submit(){
  this.ngxLoader.start();
  this.leaveservice.createTravel(this.selectForm.value).subscribe((res)=>{
    this.travellist= res;
       if (res) {
        this.ngxLoader.start();
         console.log("100" + this.travellist)
         this.toastr.showSuccess("Travel expense added successfully", "Expense Added")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }
       this.route.navigate(['/travelexpense/travel-list']);

  })

   }

}
