import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactiveFormComponent } from './post-reactive-form.component';

describe('PostReactiveFormComponent', () => {
  let component: PostReactiveFormComponent;
  let fixture: ComponentFixture<PostReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
