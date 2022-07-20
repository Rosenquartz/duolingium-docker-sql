import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestContestantComponent } from './contest-contestant.component';

describe('ContestContestantComponent', () => {
  let component: ContestContestantComponent;
  let fixture: ComponentFixture<ContestContestantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestContestantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestContestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
