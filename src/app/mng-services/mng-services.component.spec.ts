import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngServicesComponent } from './mng-services.component';

describe('MngServicesComponent', () => {
  let component: MngServicesComponent;
  let fixture: ComponentFixture<MngServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
