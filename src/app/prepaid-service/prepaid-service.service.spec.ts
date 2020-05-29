import { TestBed } from '@angular/core/testing';

import { PrepaidService } from './prepaid-service.service';

describe('PrepaidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepaidService = TestBed.inject(PrepaidService);
    expect(service).toBeTruthy();
  });
});
