import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApproveDisapproveComponent } from './leave-approve-disapprove.component';

describe('LeaveApproveDisapproveComponent', () => {
  let component: LeaveApproveDisapproveComponent;
  let fixture: ComponentFixture<LeaveApproveDisapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApproveDisapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveApproveDisapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
