import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveReasonComponent } from './view-leave-reason.component';

describe('ViewLeaveReasonComponent', () => {
  let component: ViewLeaveReasonComponent;
  let fixture: ComponentFixture<ViewLeaveReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
