import { TestBed } from '@angular/core/testing';

import { PalmsTrailersService } from './palms-trailers.service';

describe('PalmsTrailersService', () => {
  let service: PalmsTrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalmsTrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
