import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksetComponent } from './taskset.component';

describe('TasksetComponent', () => {
  let component: TasksetComponent;
  let fixture: ComponentFixture<TasksetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
