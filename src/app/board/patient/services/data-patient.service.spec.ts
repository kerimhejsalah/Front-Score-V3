import { TestBed } from '@angular/core/testing';

import { DataPatientService } from './data-patient.service';

describe('DataPatientService', () => {
  let service: DataPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
