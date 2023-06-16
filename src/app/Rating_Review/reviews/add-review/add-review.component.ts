import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  statusList: string[] = ['Active', 'Inactive'];
  reviewForm: FormGroup;
  emailList:any
  payload:any
  reviewListValue:any[]=[]
  constructor(
    private fb: FormBuilder, private reviewService: ReviewsService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
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
      referenceId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      reviewStatus: ['', [Validators.required]]
    })
    this.reviewForm.get('publishSiteUrl').valueChanges.subscribe((value) => {
      this.checkEmailValidity(value);
    });

  }

  ngOnInit(): void {
    this.getAllProfileEmail()
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



  checkEmailValidity(enteredEmail: string): void {
    if (this.emailList.includes(enteredEmail)) {
      this.toastr.showError('Email already exists!', 'Error');
    }
  }


  getAllProfileEmail() {
      this.reviewService.getReviewList().pipe(
        map((res) => res.map((profile) => profile.publishingSiteUrl))
      ).subscribe((emailList) => {
        this.emailList = emailList;
        console.log("Email List:", this.emailList);
        this.ngxLoader.stop();
      });
    }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

}
