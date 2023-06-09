import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  statusList: string[] = ['Active', 'Inactive'];
  reviewForm: FormGroup;
  payload:any
  constructor(
    private fb: FormBuilder, private reviewService: ReviewsService,
    private route: Router
  ) {
    this.reviewForm = this.fb.group({
      // publishSiteUrl: ['', [Validators.required]],
      publishSiteUrl: [
        '',
        [
          Validators.required,

          Validators.pattern(
            '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$'
          ),
        ],
      ],
      referenceId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      reviewStatus: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submitForm(){
    this.payload={
      username: localStorage.getItem("email"),
      reviewSubject:this.reviewForm.controls['referenceId'].value,
      publishingSiteUrl:this.reviewForm.controls['publishSiteUrl'].value,
      rating:'4',
      status:this.reviewForm.controls['reviewStatus'].value
    }

    this.reviewService.submitReviewDetail(this.payload).subscribe((res)=>{
      if(res){
        this.route.navigate(['/review/reviewlist'])
      }
    })
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

}
