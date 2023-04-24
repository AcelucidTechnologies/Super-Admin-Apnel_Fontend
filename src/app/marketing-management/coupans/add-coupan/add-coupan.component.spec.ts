import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoupanComponent } from './add-coupan.component';

describe('AddCoupanComponent', () => {
  let component: AddCoupanComponent;
  let fixture: ComponentFixture<AddCoupanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoupanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoupanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
