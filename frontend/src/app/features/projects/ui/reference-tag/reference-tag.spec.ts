import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceTag } from './reference-tag';

describe('ReferenceTag', () => {
  let component: ReferenceTag;
  let fixture: ComponentFixture<ReferenceTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
