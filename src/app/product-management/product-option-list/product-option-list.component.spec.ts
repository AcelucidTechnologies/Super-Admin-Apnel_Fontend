import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionListComponent } from './product-option-list.component';

describe('ProductOptionListComponent', () => {
  let component: ProductOptionListComponent;
  let fixture: ComponentFixture<ProductOptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
