import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingService } from 'src/app/_services/rating.service';
import { ReviewsService } from 'src/app/_services/reviews.service';
@Component({
  selector: 'app-rating-review-details',
  templateUrl: './rating-review-details.component.html',
  styleUrls: ['./rating-review-details.component.scss']
})
export class RatingReviewDetailsComponent implements OnInit {
  ratingData: any
  allRatingData: any;
  ratingValue: number = 3;
  ratingName: string = "";
  goodCount: any;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {

    this.getAllRatingDetails();
    this.getRatingDetails();
  }

  getAllRatingDetails(){
    this.ratingService.getAllRatingDetails().subscribe((res)=>{
      this.allRatingData= res
      const excellentCount = this.allRatingData.filter(item => item.overall == 'Good');
      console.log("64",excellentCount)
      console.log("21",this.allRatingData)
    })
  }

  selectedOverallRating: string = '';
  getFilteredData() {
    if (this.selectedOverallRating) {
      return this.ratingData.filter(item => item.overall === this.selectedOverallRating);
    } else {
      return this.ratingData;
    }
  }

  getRatingDetails() {
    this.ratingService.getRatingList().subscribe((res) => {
      this.ratingData = res;
    });
  }


  setRatingName() {
    if (this.ratingValue === 3) {
      this.ratingName = "Excellent";
    } else if (this.ratingValue === 2) {
      this.ratingName = "Good";
    } else if (this.ratingValue === 1) {
      this.ratingName = "Satisfying";
    } else {
      this.ratingName = "Unknown";
    }
  }




}
