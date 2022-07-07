import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAlphabetComponent } from './test-alphabet.component';

describe('TestAlphabetComponent', () => {
  let component: TestAlphabetComponent;
  let fixture: ComponentFixture<TestAlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAlphabetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
