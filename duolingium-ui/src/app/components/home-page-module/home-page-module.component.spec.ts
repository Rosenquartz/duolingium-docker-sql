import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageModuleComponent } from './home-page-module.component';

describe('HomePageModuleComponent', () => {
  let component: HomePageModuleComponent;
  let fixture: ComponentFixture<HomePageModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
