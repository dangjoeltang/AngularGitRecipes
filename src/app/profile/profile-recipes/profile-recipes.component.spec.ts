import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecipesComponent } from './profile-recipes.component';

describe('ProfileRecipesComponent', () => {
  let component: ProfileRecipesComponent;
  let fixture: ComponentFixture<ProfileRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
