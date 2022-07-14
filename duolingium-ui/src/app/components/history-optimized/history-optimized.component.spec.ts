import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOptimizedComponent } from './history-optimized.component';

describe('HistoryOptimizedComponent', () => {
  let component: HistoryOptimizedComponent;
  let fixture: ComponentFixture<HistoryOptimizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOptimizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOptimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
