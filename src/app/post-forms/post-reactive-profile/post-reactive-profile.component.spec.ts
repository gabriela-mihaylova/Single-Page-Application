import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactiveProfileComponent } from './post-reactive-profile.component';

describe('PostReactiveProfileComponent', () => {
  let component: PostReactiveProfileComponent;
  let fixture: ComponentFixture<PostReactiveProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReactiveProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReactiveProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
