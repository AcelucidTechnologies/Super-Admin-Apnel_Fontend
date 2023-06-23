import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExitComponent } from './edit-exit.component';

describe('EditExitComponent', () => {
  let component: EditExitComponent;
  let fixture: ComponentFixture<EditExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
