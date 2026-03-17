import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiagentComponent } from './aiagent.component';

describe('AiagentComponent', () => {
  let component: AiagentComponent;
  let fixture: ComponentFixture<AiagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiagentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
