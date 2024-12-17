import { TestBed } from '@angular/core/testing';

import { ComparisonStoreService } from './comparison-store.service';

describe('ComparisonStoreService', () => {
  let service: ComparisonStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparisonStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
