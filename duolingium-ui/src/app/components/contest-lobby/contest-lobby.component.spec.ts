import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestLobbyComponent } from './contest-lobby.component';

describe('ContestLobbyComponent', () => {
  let component: ContestLobbyComponent;
  let fixture: ComponentFixture<ContestLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
