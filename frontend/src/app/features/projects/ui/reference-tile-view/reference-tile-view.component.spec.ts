import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceTileViewComponent } from './reference-tile-view.component';

describe('TilesViewComponent', () => {
  let component: ReferenceTileViewComponent;
  let fixture: ComponentFixture<ReferenceTileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceTileViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReferenceTileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
