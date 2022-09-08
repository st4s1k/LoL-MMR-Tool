import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDataComponent } from './match-data.component';

describe('MatchDataComponent', () => {
  let component: MatchDataComponent;
  let fixture: ComponentFixture<MatchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
