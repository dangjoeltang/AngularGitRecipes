import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeChipsComponent } from './recipe-chips.component';

describe('RecipeChipsComponent', () => {
  let component: RecipeChipsComponent;
  let fixture: ComponentFixture<RecipeChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
