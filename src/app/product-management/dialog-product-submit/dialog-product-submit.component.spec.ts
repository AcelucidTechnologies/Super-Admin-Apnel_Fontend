import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductSubmitComponent } from './dialog-product-submit.component';

describe('DialogProductSubmitComponent', () => {
  let component: DialogProductSubmitComponent;
  let fixture: ComponentFixture<DialogProductSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
