import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductOptionComponent } from './edit-product-option.component';

describe('EditProductOptionComponent', () => {
  let component: EditProductOptionComponent;
  let fixture: ComponentFixture<EditProductOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
