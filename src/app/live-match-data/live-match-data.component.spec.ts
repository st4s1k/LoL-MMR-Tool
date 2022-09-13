import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMatchDataComponent } from './live-match-data.component';

describe('LiveMatchDataComponent', () => {
  let component: LiveMatchDataComponent;
  let fixture: ComponentFixture<LiveMatchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveMatchDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveMatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
