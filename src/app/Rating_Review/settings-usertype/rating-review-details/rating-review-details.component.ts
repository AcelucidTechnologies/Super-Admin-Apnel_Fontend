import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingService } from 'src/app/_services/rating.service';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-rating-review-details',
  templateUrl: './rating-review-details.component.html',
  styleUrls: ['./rating-review-details.component.scss'],
})
export class RatingReviewDetailsComponent implements OnInit {
  ratingData: any;
  allRatingData: any;
  ratingValue: number = 3;
  ratingName: string = '';
  goodCount: any;
  averageRatingGood: number;
  averageRatingExcellent: number;
  averageRatingSatisfying: number;
  averageRatingVeryBad: number;
  averageRatingVeryPoor: number;
  overallRating: any;
  ratingLength: any;
  type: any;
  sumofAverage: any;
  averageRating: any;
  totalNoRating: number;
  ratingandReview: any[] = [];
  filteredData: any;
  roundedRating: number

  constructor(
    private ratingService: RatingService,
    private datePipe: DatePipe
  ) {
    // this.roundedRating = Number(this.overallRating.toFixed(1));
  }

  ngOnInit(): void {
    this.getAllRatingDetails();
    this.getRatingDetails();
    this.getRatingandReviewData();
    this.type = [
      'All Ratings',
      'Excellent',
      'Good',
      'Satisfying',
      'Very Bad',
      'Very Poor',
    ];
  }

  getAllRatingDetails() {
    this.ratingService.getAllRatingDetails().subscribe((res) => {
      this.allRatingData = res;
      this.ratingLength = this.allRatingData.length;
      this.averageRating = this.allRatingData.map((review) =>
        parseFloat(review.AverageRating)
      );
      this.sumofAverage = this.averageRating.reduce(
        (accumulator, rating) => accumulator + rating,
        0
      );
      console.log('Sum of all ratings:', this.sumofAverage);
      const excellentCount = this.allRatingData.filter(
        (item) => item.overall == 'Good'
      );
      console.log('64', excellentCount);
      console.log('21', this.averageRating);

      this.overallRating = this.sumofAverage / this.ratingLength;


    });
  }

  getRatingDetails() {
    this.ratingService.getRatingList().subscribe((res) => {
      this.ratingData = res;
      console.log(
        'length of an array in rating detail' + this.ratingData.length
      );
      console.log(
        'rating details for user type' +
          JSON.stringify(this.ratingData[0].createdAt)
      );
    });
  }
  selectedOverallRating: string = 'All Ratings';
  getFilteredData() {
    if (this.selectedOverallRating !== 'All Ratings') {
      return this.allRatingData.filter(
        (item) => item.overall === this.selectedOverallRating
      );
    } else {
      return this.allRatingData;
    }
  }

  getRatingandReviewData() {
    this.ratingService.getRatingandReviewList().subscribe((res) => {
      this.ratingandReview = res;

      let totalRatingsExcellent = 0;
      let totalRatingsGood = 0;
      let totalRating = 0;
      let totalRatingsSatisfying = 0;
      let totalRatingsVeryBad = 0;
      let totalRatingsVeryPoor = 0;

      this.ratingandReview.forEach((item: any) => {
        if (item.overall === 'Excellent') {
          totalRatingsExcellent += item.ratings.length;
        } else if (item.overall === 'Good') {
          totalRatingsGood += item.ratings.length;
        } else if (item.overall === 'Satisfying') {
          totalRatingsSatisfying += item.ratings.length;
        } else if (item.overall === 'Very bad') {
          totalRatingsVeryBad += item.ratings.length;
        } else if (item.overall === 'ver Poor') {
          totalRatingsVeryPoor += item.ratings.length;
        }

        totalRating += item.ratings.length;
        // console.log("24===>" + totalRating)
      });

      this.totalNoRating = totalRating;
      this.averageRatingExcellent = totalRatingsExcellent / totalRating;
      this.averageRatingGood = totalRatingsGood / totalRating;
      this.averageRatingSatisfying = totalRatingsSatisfying / totalRating;
      this.averageRatingVeryBad = totalRatingsVeryBad / totalRating;
      this.averageRatingVeryPoor = totalRatingsVeryPoor / totalRating;
      // this.overallRating = 5 / totalRating;
      // this.overallRating = this.averageRatingExcellent + this.averageRatingGood + this.averageRatingSatisfying +
      // this.averageRatingVeryPoor +  this.averageRatingVeryPoor / this.ratingLength

      console.log('Average Rating (Excellent): ', this.averageRatingExcellent);
      console.log('Average Rating (Good): ', this.averageRatingGood);
      console.log(
        'Average Rating (satisfying): ',
        this.averageRatingSatisfying
      );
      console.log('Average Rating (very bad): ', this.averageRatingVeryBad);
      console.log('Average Rating (very poor): ', this.averageRatingVeryPoor);
      console.log('Average Rating (Overall): ', this.overallRating);
    });
  }

  setRatingName() {
    if (this.ratingValue === 3) {
      this.ratingName = 'Excellent';
    } else if (this.ratingValue === 2) {
      this.ratingName = 'Good';
    } else if (this.ratingValue === 1) {
      this.ratingName = 'Satisfying';
    } else {
      this.ratingName = 'Unknown';
    }
  }
}
