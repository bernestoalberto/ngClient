import { TestBed } from '@angular/core/testing';

import { NewsletterService } from './newsletter.service';

describe('NewsletterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsletterService = TestBed.inject(NewsletterService);
    expect(service).toBeTruthy();
  });
});
