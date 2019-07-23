import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImgUploaderComponent } from './multi-img-uploader.component';

describe('MultiImgUploaderComponent', () => {
  let component: MultiImgUploaderComponent;
  let fixture: ComponentFixture<MultiImgUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiImgUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiImgUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
