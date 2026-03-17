import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightHeadingComponent } from './highlight-heading.component';

describe('HighlightHeadingComponent', () => {
  let component: HighlightHeadingComponent;
  let fixture: ComponentFixture<HighlightHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
