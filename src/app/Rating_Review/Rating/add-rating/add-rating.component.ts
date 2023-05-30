import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';
import { RatingService } from 'src/app/_services/rating.service';
import { Router } from '@angular/router';
import { RatingCriteriaService } from 'src/app/_services/rating-criteria.service';
import { ReviewsService } from 'src/app/_services/reviews.service';
@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss'],
})
export class AddRatingComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  ratingForm: FormGroup;
  reviewerOptions: string[] = [];
  ratingSettingData: any;
  CriteriaList: any;
  reviewerData: any;
  ratingdata: any;
  reviewOptions: string[] = ['Hotel Plaza', 'Palm Hotel', 'Prince Hotel'];
  statusOptions: string[] = ['Approved', 'Not Approved'];
  userTypeOptions: string[] = ['Business Trip', 'Couple', 'Family', 'Group'];

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private ratingService: RatingService,
    private reviewsService: ReviewsService,
    private route: Router,
    private ratingCriteriaService: RatingCriteriaService
  ) {
    this.ratingForm = this.fb.group({
      reviewer: ['', [Validators.required]],
      review: ['', [Validators.required]],
      overall: ['', [Validators.required]],
      pros: [''],
      cons: [''],
      ratingType: this.fb.array([

      ]
      ),
      userType: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.ratingService.getReviewerList().subscribe((res) => {
      this.reviewerOptions = res;
    });
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  submitForm() {
    let payload = {
      reviewer: this.ratingForm.controls['reviewer'].value,
      review: this.ratingForm.controls['review'].value,
      rating: this.ratingForm.controls['overall'].value,
      status: this.ratingForm.controls['status'].value,
      ratingType: this.ratingForm.controls['ratingType'].value,
      positives: this.ratingForm.controls['pros'].value,
      negatives: this.ratingForm.controls['cons'].value,
      userType: this.ratingForm.controls['userType'].value,
    };
    console.log(payload);
    this.ratingService.submitRatingData(payload).subscribe((res) => {
      if (res) {
        this.route.navigate(['/rating/ratinglist']);
      }
    });
  }
  openExportDialog() {
    const dialogRef = this.dialog.open(ExportDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.ratingService.getReviewerList().subscribe((res) => {
          console.log(res);
          this.reviewerOptions = res;
        });
      }
    });
  }

  ngOnInit(): void {
    // let formpart= this.ratingForm.controls['ratingType']as FormGroup
    // formpart.controls['cleaniness']
    this.getReviewList();
    this.getReviewerData();
    this.getCriteriaList();
  }

  show(data) {
    console.log(data);
  }

  getCriteriaList() {
    this.ratingCriteriaService.getCriteriaList().subscribe((res) => {
      this.CriteriaList = res;
      console.log('----> 98', this.CriteriaList);
    });
  }

  getReviewerData() {
    this.ratingService.getName().subscribe((res) => {
      this.reviewerData = res;
      console.log('51', this.reviewerData);
    });
  }

  getReviewList() {
    this.reviewsService.getReviewList().subscribe((res) => {
      this.ratingSettingData = res;
      console.log('--------->107', this.ratingSettingData);
    });
  }

  get ratingType() : FormArray {
    return this.ratingForm.get("ratingType") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      value: '',

    })
 }

addSkills() {
   this.ratingType.push(this.newSkill());
}
}
