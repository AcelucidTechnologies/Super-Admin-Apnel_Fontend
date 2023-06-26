import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.scss']
})
export class EditTravelComponent {
  selectForm: FormGroup;
  exitlist:any;
  id:any;
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
      employeeId: ['',[Validators.required] ],
      employeeName: ['',[Validators.required] ],
      journeyDate: ['',[Validators.required, ]],
      returnDate: ['',[Validators.required,  this.validateToDate.bind(this)]],
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

getTravelDetail(){
  this.leaveservice.getTravelById(this.id).subscribe((res)=>{
    const journeyDate = this.convertDateFormat(res.journeyDate);
    const returnDate = this.convertDateFormat(res.returnDate);
  this.selectForm.patchValue({
    employeeId:res.employeeId,
    employeeName:res.employeeName,
    journeyDate:journeyDate,
    returnDate:returnDate,
    travelFrom:res.travelFrom,
    travelTo:res.travelTo,
    purposeTravel:res.purposeTravel,

  })
  })
  }
  convertDateFormat(apiDate: string): string {
    if (!apiDate) {
      return ''; // or return a default value if desired
    }

    const date = new Date(apiDate);
    const year = date.getUTCFullYear();
    const month = this.formatNumber(date.getUTCMonth() + 1);
    const day = this.formatNumber(date.getUTCDate());
    return `${year}-${month}-${day}`;
    // return `${month}/${date}/${year}`;
  }

  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  ngOnInit(){
    this.getTravelDetail()
  }

 submit(){
  this.ngxLoader.start();
  this.leaveservice.editTravelList(this.selectForm.value, this.id).subscribe((res)=>{
    this.exitlist= res;
       if (res) {
        this.ngxLoader.start();
         console.log("100" + this.exitlist)
         this.toastr.showSuccess("Travel expense edit successfully", "Expense Edited")
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
