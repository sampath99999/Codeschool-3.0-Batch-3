import { TestBed } from '@angular/core/testing';

import { ViewPostService } from './view-post.service';

describe('ViewBlogService', () => {
  let service: ViewPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
