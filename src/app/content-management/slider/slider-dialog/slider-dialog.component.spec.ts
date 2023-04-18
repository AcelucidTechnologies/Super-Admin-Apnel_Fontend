import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDialogComponent } from './slider-dialog.component';

describe('SliderDialogComponent', () => {
  let component: SliderDialogComponent;
  let fixture: ComponentFixture<SliderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
