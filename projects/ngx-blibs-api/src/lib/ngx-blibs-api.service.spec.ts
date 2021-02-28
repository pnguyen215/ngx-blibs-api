import { TestBed } from '@angular/core/testing';

import { NgxBlibsApiService } from './ngx-blibs-api.service';

describe('NgxBlibsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxBlibsApiService = TestBed.get(NgxBlibsApiService);
    expect(service).toBeTruthy();
  });
});
