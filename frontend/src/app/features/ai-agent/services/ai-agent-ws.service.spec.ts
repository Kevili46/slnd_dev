import { TestBed } from '@angular/core/testing';

import { AiAgentWSService } from './ai-agent-ws.service';

describe('AiAgentHttpService', () => {
  let service: AiAgentWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAgentWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
