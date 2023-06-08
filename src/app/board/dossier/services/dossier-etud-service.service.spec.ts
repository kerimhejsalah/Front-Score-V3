import { TestBed } from '@angular/core/testing';

import { DossierEtudServiceService } from './dossier-etud-service.service';

describe('DossierEtudServiceService', () => {
  let service: DossierEtudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierEtudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
