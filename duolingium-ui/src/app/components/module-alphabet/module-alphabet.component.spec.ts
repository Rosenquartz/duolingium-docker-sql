import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAlphabetComponent } from './module-alphabet.component';

describe('ModuleAlphabetComponent', () => {
  let component: ModuleAlphabetComponent;
  let fixture: ComponentFixture<ModuleAlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleAlphabetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
