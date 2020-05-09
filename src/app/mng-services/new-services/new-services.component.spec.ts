import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServicesComponent } from './new-services.component';

describe('NewServicesComponent', () => {
  let component: NewServicesComponent;
  let fixture: ComponentFixture<NewServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
