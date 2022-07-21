import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestFooterComponent } from './contest-footer.component';

describe('ContestFooterComponent', () => {
  let component: ContestFooterComponent;
  let fixture: ComponentFixture<ContestFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
