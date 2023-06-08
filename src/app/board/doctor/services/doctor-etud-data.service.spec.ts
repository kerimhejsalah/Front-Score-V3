import { TestBed } from '@angular/core/testing';

import { DoctorEtudDataService } from './doctor-etud-data.service';

describe('DoctorEtudDataService', () => {
  let service: DoctorEtudDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorEtudDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
