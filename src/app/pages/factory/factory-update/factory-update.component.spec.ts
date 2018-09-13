import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryUpdateComponent } from './factory-update.component';

describe('FactoryUpdateComponent', () => {
  let component: FactoryUpdateComponent;
  let fixture: ComponentFixture<FactoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
