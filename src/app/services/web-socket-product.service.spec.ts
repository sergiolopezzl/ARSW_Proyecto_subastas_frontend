import { TestBed } from '@angular/core/testing';

import { WebSocketProductService } from './web-socket-product.service';

describe('WebSocketProductService', () => {
  let service: WebSocketProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
