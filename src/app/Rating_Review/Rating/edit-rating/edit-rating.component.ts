import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ratingStructure } from 'src/app/_models/rating';
import { RatingCriteriaService } from 'src/app/_services/rating-criteria.service';
import { RatingService } from 'src/app/_services/rating.service';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { UsertypeService } from 'src/app/_services/usertype.service';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.scss']
})
export class EditRatingComponent implements OnInit {



  sidebarSpacing:string = 'contracted';
  ratingData:ratingStructure[]=[];
  ratingForm:FormGroup;
  reviewerDataOption: any[]=[];
  title:string;
  update:any;
  editMode:boolean = false;
  CriteriaList: any;
  payload: any;
  ratingSettingData: any;
  usertypeSettingData: any;
  overAll: any;


  id:any
  rating:any
  name:string;
  // detailForm:FormGroup
  reviewerOptions:string[]=[];
  reviewOptions:string[]=['Hotel Plaza','Palm Hotel','Prince Hotel'];
  statusOptions:string[]=['Approved','Not Approved'];
  userTypeOptions:string[]=['Business Trip','Couple','Family','Group']
  rating1: any;
  constructor(private fb:FormBuilder,private ratingService:RatingService,
    public dialog: MatDialog,
    private ActivatedRoute:ActivatedRoute,
    private ratingCriteriaService: RatingCriteriaService,
    private usertypeService: UsertypeService,
    private reviewsService: ReviewsService,
    private route:Router) {

    // this.detailForm = this.fb.group({
    //   date:['25-02-2022 14:56pm'],
    //   ipAddress:[ '13.126.212.31']
    // })
      this.ratingForm = this.fb.group({
        createdAt:['', Validators.required],
        // ipAddress:[ '13.126.212.31'],
      reviewer: ['', [Validators.required]],
      review: ['', [Validators.required]],
      overall: ['', [Validators.required]],
      pros: [''],
      cons: [''],
      ratings: this.fb.array([

      ]
      ),
      userType: ['select',[Validators.required]],
      status: ['', [Validators.required]],
      username:[''],
      id: ['']
    })
    this.ratingService.getReviewerList().subscribe((res)=>{
      this.reviewerOptions=res
    })
    // this.ActivatedRoute.queryParamMap.subscribe((params)=>{
    //   this.name=params.get('reviewerName')
    //       })
    this.ActivatedRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Rating"
        this.update= "Update"
        this.getRatingDetails()
      } else {
        this.editMode = false

      }
    });

   }

  ngOnInit(): void {
    this.getRatingDetails();
    this.getReviewerDataOption();
    this.getCriteriaList();
    this.getReviewList();
    this.getUsertypeList();
    this.overAll=['Excellent','Good','Satisfying','Very Bad','Very Poor']
  }

  getRatingDetails()
  {

    this.ratingService.getRatingDetailsById(this.id).subscribe((res) => {
      this.rating1= res
     console.log("rating response by id" + JSON.stringify(this.rating1))
     this.ratingForm.patchValue({
       reviewer: res.reviewer,
       review: res.review,
       overall: res.overall,
       pros: res.pros,
       cons: res.cons,
       userType:res.userType,
       status: res.status,
       ratings:res.ratings,
       createdAt:res.createdAt
     })

     // this.ratingData[0].ratingType
     // this.ratingForm.controls["ratingType"].patchValue(this.ratingData[0].ratingType)
   })

  }
  onToggleSidebar(sidebarState: any) {
  if (sidebarState === 'open') {
    this.sidebarSpacing = 'contracted';
  } else {
    this.sidebarSpacing = 'expanded';
  }

}
getUsertypeList(){
  this.usertypeService.getUsertypeList().subscribe((res)=>{
    // this.usertypeSettingData=res
    this.usertypeSettingData = res.filter(item => item.status === 'Active');
    console.log("152",this.usertypeSettingData)
  })
}
populateRatings(): void {
  const ratingsArray = this.ratingForm.get('ratings') as FormArray;
  this.CriteriaList.forEach((rating) => {
    if (rating.status === 'Active') {
    ratingsArray.push(this.fb.group({
      rating: [rating.value],
      name: [rating.ratingCriteria],
      _id:[rating._id]
    }));
  }
  });
}
getCriteriaList() {
  this.ratingCriteriaService.getCriteriaList().subscribe((res) => {
    this.CriteriaList = res;
    console.log('----> 98', this.CriteriaList);
    this.populateRatings();
  });
}

getReviewList() {
  this.reviewsService.getReviewList().subscribe((res) => {
    // this.ratingSettingData = res;
    this.ratingSettingData = res.filter(item => item.status === 'Active');
    console.log('--------->107', this.ratingSettingData);
  });
}


getReviewerDataOption() {
  this.ratingService.getName().subscribe((res) => {
    // this.reviewerDataOption = res;
    this.reviewerDataOption = res.filter(item => item.status === 'Active');
    console.log('51', this.reviewerDataOption);
  });
}

openExportDialog(){
  const dialogRef = this.dialog.open(ExportDialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    if (result == true) {
    this.ratingService.getReviewerList().subscribe((res)=>{
      console.log(res)
      this.reviewerOptions = res;
    })
    }
  });
}

submitForm(){
  this.payload={
    _id: this.id,
    username: localStorage.getItem("email"),
    reviewer:this.ratingForm.controls["reviewer"].value,
    review:this.ratingForm.controls["review"].value,
    rating:this.ratingForm.controls["overall"].value,
    status:this.ratingForm.controls["status"].value,
    ratings: this.ratingForm.controls['ratings'].value,
    // ratingType:this.ratingForm.controls["ratingType"].value,
    pros:this.ratingForm.controls["pros"].value,
    cons:this.ratingForm.controls["cons"].value,
    userType:this.ratingForm.controls["userType"].value
  }
  console.log(this.payload)
  this.ratingService.submitRatingEditData(this.payload,this.id).subscribe((res)=>{
    if(res)
    {
      this.route.navigate(['/rating/ratinglist'])
    }
  })

}


show(data:any){
  console.log(data)
}
}
