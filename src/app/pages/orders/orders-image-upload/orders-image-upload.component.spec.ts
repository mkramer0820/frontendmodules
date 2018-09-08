import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersImageUploadComponent } from './orders-image-upload.component';

describe('OrdersImageUploadComponent', () => {
  let component: OrdersImageUploadComponent;
  let fixture: ComponentFixture<OrdersImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
