import { TestBed } from '@angular/core/testing';

import { AiAgentHttpService } from './ai-agent-http.service';

describe('AiAgentHttpService', () => {
  let service: AiAgentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAgentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
