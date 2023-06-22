import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerService } from 'src/app/_services/reviewer.service';

@Component({
  selector: 'app-add-edit-reviewer',
  templateUrl: './add-edit-reviewer.component.html',
  styleUrls: ['./add-edit-reviewer.component.scss']
})
export class AddEditReviewerComponent implements OnInit {
sidebarSpacing:string='contracted';
statusList:string[]=['Active','Inactive']
title:string;
editMode:boolean = false;
// id:number;
id:any
update:any;
reviewerForm:FormGroup
  change: string;
constructor(private reviewerService:ReviewerService,
  private fb:FormBuilder,
  private route:Router,
  private activatedRoute:ActivatedRoute) {

  this.reviewerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    email: ['', [Validators.required,  Validators.email]],
    reviewerStatus: ['', [Validators.required]],
  });


  this.activatedRoute.queryParamMap.subscribe(params => {
    this.id = params.get('id');
    if (this.id && this.id != undefined) {
      this.editMode = true
      this.title = "Edit Rating"
      this.update= "Update"
    } else {
      this.editMode = false

    }
  });

}

ngOnInit(): void {
  this.getReviewerDetail();
}



getReviewerDetail(){
this.reviewerService.getReviewerDetailsById(this.id).subscribe((res)=>{
this.reviewerForm.patchValue({
  name:res.name,
  email:res.email,
  reviewerStatus:res.status
})
})
}

submit()
{
  let payload={
    username: localStorage.getItem("email"),
    name:this.reviewerForm.controls['name'].value,
    email:this.reviewerForm.controls['email'].value,
    status:this.reviewerForm.controls['reviewerStatus'].value
  }
  this.id?this.submitEditedDetails(payload):this.submitDetails(payload)
}

submitEditedDetails(recievedValue:any){
let newPayload= Object.assign({},recievedValue)
this.reviewerService.submitEditedDetails(newPayload,this.id).subscribe((res)=>{
 if(res)
  this.route.navigate(['/reviewer/reviewerlist'])
})
}

submitDetails(recievedValue:any){
  let newPayload= Object.assign({},recievedValue)
  this.reviewerService.submitReviewerDetail(newPayload).subscribe((res)=>{
    if(res)
     this.route.navigate(['/reviewer/reviewerlist'])
   })
}


onToggleSidebar(sidebarState: any){
  if (sidebarState === 'open') {
    this.sidebarSpacing = 'contracted';
  } else {
    this.sidebarSpacing = 'expanded';
  }
}
capitalizeFirstLetter(event: any) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  if (value.length > 0) {
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    this.reviewerForm.patchValue({
      name: capitalizedValue
    });
  }
}








}
