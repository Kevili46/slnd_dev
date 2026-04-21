import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileReferenceComponent } from './tile-reference.component';

describe('ReferenceComponent', () => {
  let component: TileReferenceComponent;
  let fixture: ComponentFixture<TileReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileReferenceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TileReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
