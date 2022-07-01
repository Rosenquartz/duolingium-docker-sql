import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLearnComponent } from './module-learn.component';

describe('ModuleLearnComponent', () => {
  let component: ModuleLearnComponent;
  let fixture: ComponentFixture<ModuleLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleLearnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
