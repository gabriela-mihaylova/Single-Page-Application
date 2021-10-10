import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListAnnounceComponent } from './card-list-announce.component';

describe('CardListAnnounceComponent', () => {
  let component: CardListAnnounceComponent;
  let fixture: ComponentFixture<CardListAnnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListAnnounceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
