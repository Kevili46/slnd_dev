import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceListViewComponent } from './reference-list-view.component';

describe('ReferenceListViewComponent', () => {
  let component: ReferenceListViewComponent;
  let fixture: ComponentFixture<ReferenceListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
