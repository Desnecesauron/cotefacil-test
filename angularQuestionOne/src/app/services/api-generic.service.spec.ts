import { TestBed } from '@angular/core/testing';

import { ApiGenericService } from './api-generic.service';

describe('ApiGenericService', () => {
  let service: ApiGenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
