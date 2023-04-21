import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPageListComponent } from './add-page-list.component';

describe('AddPageListComponent', () => {
  let component: AddPageListComponent;
  let fixture: ComponentFixture<AddPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
