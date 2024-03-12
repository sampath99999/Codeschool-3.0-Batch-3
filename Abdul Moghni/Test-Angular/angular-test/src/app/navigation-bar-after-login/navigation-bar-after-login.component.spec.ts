import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarAfterLoginComponent } from './navigation-bar-after-login.component';

describe('NavigationBarAfterLoginComponent', () => {
  let component: NavigationBarAfterLoginComponent;
  let fixture: ComponentFixture<NavigationBarAfterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarAfterLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBarAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
