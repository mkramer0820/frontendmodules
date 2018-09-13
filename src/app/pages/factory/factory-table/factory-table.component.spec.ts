import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryTableComponent } from './factory-table.component';

describe('FactoryTableComponent', () => {
  let component: FactoryTableComponent;
  let fixture: ComponentFixture<FactoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
