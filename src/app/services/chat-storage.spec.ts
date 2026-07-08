import { TestBed } from '@angular/core/testing';

import { ChatStorage } from './chat-storage';

describe('ChatStorage', () => {
  let service: ChatStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
