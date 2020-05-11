import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidServiceComponent } from './prepaid-service.component';

describe('PrepaidServiceComponent', () => {
  let component: PrepaidServiceComponent;
  let fixture: ComponentFixture<PrepaidServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
