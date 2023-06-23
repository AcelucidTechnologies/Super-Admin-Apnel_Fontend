import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExitComponent } from './add-exit.component';

describe('AddExitComponent', () => {
  let component: AddExitComponent;
  let fixture: ComponentFixture<AddExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
