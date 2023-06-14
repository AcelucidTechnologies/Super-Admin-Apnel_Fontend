import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSourceHiringComponent } from './dialog-source-hiring.component';

describe('DialogSourceHiringComponent', () => {
  let component: DialogSourceHiringComponent;
  let fixture: ComponentFixture<DialogSourceHiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSourceHiringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSourceHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
