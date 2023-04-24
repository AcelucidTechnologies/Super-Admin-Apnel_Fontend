import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupanDialogComponent } from './coupan-dialog.component';

describe('CoupanDialogComponent', () => {
  let component: CoupanDialogComponent;
  let fixture: ComponentFixture<CoupanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoupanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
