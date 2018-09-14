import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryContactComponent } from './factory-contact.component';

describe('FactoryContactComponent', () => {
  let component: FactoryContactComponent;
  let fixture: ComponentFixture<FactoryContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
