import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReviewDetailsComponent } from './rating-review-details.component';

describe('RatingReviewDetailsComponent', () => {
  let component: RatingReviewDetailsComponent;
  let fixture: ComponentFixture<RatingReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingReviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
