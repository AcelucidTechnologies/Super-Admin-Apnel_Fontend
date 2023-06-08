import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  reviewList: string[] = ['Friend', 'Family', 'Business Trip'];
  statusList: string[] = ['Active', 'Inactive'];
  serialno: number;
  editForm: FormGroup;
  review:any;
  payload:any
  id:any
  title:string;
  update:any;
  editMode:boolean = false
  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private reviewsService:ReviewsService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
  ) {
    // this.activatedRoute.queryParamMap.subscribe((res) => {
    //   this.serialno = parseInt(res.get('serialno'));
    //   console.log(this.serialno);
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Review"
        this.update= "Update"
        // this.getReviewListById()
      } else {
        this.editMode = false

      }
    });

    this.editForm = this.fb.group({
      rating: [''],
      // lastRating: ['24-03-2023, 12:34am By Rahul'],
      // reviewerType: ['', [Validators.required]],
      publishingSiteUrl: ['', [Validators.required]],
      referenceId: ['', [Validators.required]],
      status: ['', [Validators.required]],
      username:['']

    });
    // this.getReviewList()
  }

  ngOnInit(): void {
    this.getReviewListById()

  }

  submit() {
    this.editForm.patchValue({
      username: localStorage.getItem('email')|| ''
    });
    this.payload = {
      username: this.editForm.controls['username'].value,
      reviewSubject: this.editForm.controls['referenceId'].value,
      publishingSiteUrl: this.editForm.controls['publishingSiteUrl'].value,
      rating: this.editForm.controls['rating'].value,
      status: this.editForm.controls['status'].value,
    };
    this.ngxLoader.start();
    if (this.editMode) {
      this.editReviews()
      }
      this.route.navigate(['/review/reviewlist'])

  }

  editReviews(){
    this.reviewsService.editReviewList(this.payload, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Review list edit successfully", "Reviews edit")
        this.ngxLoader.stop()
        this.route.navigate(['/review/reviewlist'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
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

  getReviewListById(){
    this.reviewsService.getReviewDetailById(this.id).subscribe((res)=>{
      this.review = res
      console.log("review list by id ===>"+JSON.stringify(res))
      this.editForm.patchValue({
        rating:res.ratingCountReview,
        // reviewerType: '',
        publishingSiteUrl: res.publishingSiteUrl,
        referenceId: res.reviewSubject,
        status: res.status,
      });
    })
  }
  // getReviewList(){
  //   this.reviewsService.getReviewDetail(this.serialno).subscribe((res)=>{
  //     console.log(res)
  //     this.editForm.patchValue({
  //       rating:res[0].rating,
  //       reviewerType: 'Friend',
  //       reviewPublishPage: res[0].publishingsiteurl,
  //       referenceId: res[0].reviewSubject,
  //       reviewStatus: res[0].status,
  //     });
  //   })
  // }
}
