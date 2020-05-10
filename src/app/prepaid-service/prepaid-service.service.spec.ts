import { TestBed } from '@angular/core/testing';

import { PrepaidServiceService } from './prepaid-service.service';

describe('PrepaidServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepaidServiceService = TesBed.inject(PrepaidServiceService);
    expect(service).toBeTruthy();
  });
});
