import { TestBed } from '@angular/core/testing';

import { UrlvideoService } from './urlvideo.service';

describe('UrlvideoService', () => {
  let service: UrlvideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlvideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
