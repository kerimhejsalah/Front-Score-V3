import { TestBed } from '@angular/core/testing';

import { FormsetudService } from './formsetud.service';

describe('FormsetudService', () => {
  let service: FormsetudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsetudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
