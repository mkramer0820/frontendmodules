import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUpdateComponent } from './orders-update.component';

describe('OrdersUpdateComponent', () => {
  let component: OrdersUpdateComponent;
  let fixture: ComponentFixture<OrdersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
