import { TestBed } from '@angular/core/testing';

import { SnackBarDefaultsService } from './snack-bar-defaults.service';

describe('SnackBarDefaultsService', () => {
  let service: SnackBarDefaultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarDefaultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
