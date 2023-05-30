import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingService } from 'src/app/_services/rating.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
// formats:string[];
// timePeriod:string[];
  reviewerForm:FormGroup;
  payload:any;
  constructor(private fb:FormBuilder,private ratingService:RatingService,private route:Router,
    private toastr: ToastrMsgService,) {
    this.reviewerForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.formats=['Excel','CSV','PDF']
    // this.timePeriod=['today','yesterday','this week','this month','last month']

  }

  submitForm(){
     this.payload={
      name:this.reviewerForm.controls['name'].value,
      email:this.reviewerForm.controls['email'].value
    }

    this.ratingService.submitReviewerData(this.payload)
    this.addReviewerName();
//       if(res)
//       {
// this. route
//       }
  }

  addReviewerName(){
    this.ratingService.createNewReviewername(this.payload).subscribe((res)=>{
      if(res){
        this.toastr.showSuccess("Coupan added successfully", "Coupan Added")
        this.route.navigate(['/rating/ratinglist']);
      }
    })
  }
}
