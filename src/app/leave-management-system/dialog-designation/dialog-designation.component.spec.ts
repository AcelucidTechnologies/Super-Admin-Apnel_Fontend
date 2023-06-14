import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDesignationComponent } from './dialog-designation.component';

describe('DialogDesignationComponent', () => {
  let component: DialogDesignationComponent;
  let fixture: ComponentFixture<DialogDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDesignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
