import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';

describe('ReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportService = TesBed.inject(ReportService);
    expect(service).toBeTruthy();
  });
});
