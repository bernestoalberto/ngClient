import { TestBed } from '@angular/core/testing';

import { DownloaderService } from './downloader.service';

describe('DownloaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloaderService = TestBed.inject(DownloaderService);
    expect(service).toBeTruthy();
  });
});
