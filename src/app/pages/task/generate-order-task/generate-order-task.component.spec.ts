import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOrderTaskComponent } from './generate-order-task.component';

describe('GenerateOrderTaskComponent', () => {
  let component: GenerateOrderTaskComponent;
  let fixture: ComponentFixture<GenerateOrderTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOrderTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOrderTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
