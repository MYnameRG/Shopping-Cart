import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManageListComponent } from './product-manage-list.component';

describe('ProductManageListComponent', () => {
  let component: ProductManageListComponent;
  let fixture: ComponentFixture<ProductManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
