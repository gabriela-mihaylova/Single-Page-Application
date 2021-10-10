import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactiveOrganizationProfileComponent } from './post-reactive-organization-profile.component';

describe('PostReactiveOrganizationProfileComponent', () => {
  let component: PostReactiveOrganizationProfileComponent;
  let fixture: ComponentFixture<PostReactiveOrganizationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReactiveOrganizationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReactiveOrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
