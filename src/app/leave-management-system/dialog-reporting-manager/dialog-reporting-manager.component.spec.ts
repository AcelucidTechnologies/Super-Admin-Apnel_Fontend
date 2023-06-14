import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReportingManagerComponent } from './dialog-reporting-manager.component';

describe('DialogReportingManagerComponent', () => {
  let component: DialogReportingManagerComponent;
  let fixture: ComponentFixture<DialogReportingManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReportingManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogReportingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
