import { TestBed } from '@angular/core/testing';

import { CommonuserService } from './commonuser.service';

describe('CommonuserService', () => {
  let service: CommonuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
