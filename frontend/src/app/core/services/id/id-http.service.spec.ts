import { TestBed } from '@angular/core/testing';

import { IdHttpService } from './id-http.service';

describe('IdHttpService', () => {
  let service: IdHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
