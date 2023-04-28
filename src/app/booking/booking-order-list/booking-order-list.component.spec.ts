import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOrderListComponent } from './booking-order-list.component';

describe('BookingOrderListComponent', () => {
  let component: BookingOrderListComponent;
  let fixture: ComponentFixture<BookingOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
