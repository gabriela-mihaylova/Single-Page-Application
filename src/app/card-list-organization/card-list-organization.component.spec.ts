import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListOrganizationComponent } from './card-list-organization.component';

describe('CardListOrganizationComponent', () => {
  let component: CardListOrganizationComponent;
  let fixture: ComponentFixture<CardListOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
