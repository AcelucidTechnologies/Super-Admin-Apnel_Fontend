import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecialOfferComponent } from './dialog-special-offer.component';

describe('DialogSpecialOfferComponent', () => {
  let component: DialogSpecialOfferComponent;
  let fixture: ComponentFixture<DialogSpecialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSpecialOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
