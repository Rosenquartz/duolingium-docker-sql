import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestHeaderComponent } from './contest-header.component';

describe('ContestHeaderComponent', () => {
  let component: ContestHeaderComponent;
  let fixture: ComponentFixture<ContestHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
