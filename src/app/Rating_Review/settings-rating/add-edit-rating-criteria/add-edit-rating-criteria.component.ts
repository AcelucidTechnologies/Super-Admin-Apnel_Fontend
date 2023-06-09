import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  RatingCriteriaService } from 'src/app/_services/rating-criteria.service'

@Component({
  selector: 'app-add-edit-rating-criteria',
  templateUrl: './add-edit-rating-criteria.component.html',
  styleUrls: ['./add-edit-rating-criteria.component.scss'],
})
export class AddEditRatingCriteriaComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  criteriaForm: FormGroup;
  title:string;
  id:any;
  editMode: boolean = false;
  constructor(
    private ratingCriteriaService: RatingCriteriaService,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute:ActivatedRoute) {
      this.criteriaForm = fb.group({
        ratingCriteria: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        status: ['', [Validators.required]],
      });

      this.activatedRoute.queryParamMap.subscribe((params)=>{
      this.id = params.get('id');
      if(this.id && this.id != undefined)
      {
        this.editMode = true
        this.title = 'Edit';
        this.getRatingCriteriaDetail();
      }
      else{
        this.editMode = false
        this.title = "Add";
      }
    })

  }

  statusList: string[] = ['Active', 'Inactive'];
  ngOnInit(): void {}

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  submit() {
    let payload = {
      username: localStorage.getItem("email"),
      ratingCriteria: this.criteriaForm.controls['ratingCriteria'].value,
      status: this.criteriaForm.controls['status'].value,
    };
    this.id?this.submitEditedDetails(payload):this.submitDetails(payload)

  }


submitEditedDetails(recievedValue:any){
let newPayload= Object.assign({},recievedValue)
this.ratingCriteriaService.submitEditedCriteriaDetail(newPayload,this.id).subscribe((res)=>{
 if(res)
 this.route.navigate(['/ratesettings/ratingcriterialist']);
})
}

submitDetails(recievedValue:any){
  let newPayload= Object.assign({},recievedValue)
  this.ratingCriteriaService
  .submitCriteriaDetail(newPayload)
  .subscribe((res) => {
    if (res) {
      this.route.navigate(['/ratesettings/ratingcriterialist']);
    }
  });
}

getRatingCriteriaDetail(){
  this.ratingCriteriaService.getCriteriaDetails(this.id).subscribe((res)=>{
    console.log("----45----->",res);
    this.criteriaForm.patchValue({
      _id: res._id,
      ratingCriteria :res.ratingCriteria,
      status: res.status
    })
  })
}



}
