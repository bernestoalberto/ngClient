import { TestBed } from '@angular/core/testing';

import { IpayService } from './ipay.service';

describe('IpayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpayService = TestBed.inject(IpayService);
    expect(service).toBeTruthy();
  });
});
