import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestConductorComponent } from './contest-conductor.component';

describe('ContestConductorComponent', () => {
  let component: ContestConductorComponent;
  let fixture: ComponentFixture<ContestConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestConductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
