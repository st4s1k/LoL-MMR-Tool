import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmrTableComponent } from './mmr-table.component';

describe('MmrTableComponent', () => {
  let component: MmrTableComponent;
  let fixture: ComponentFixture<MmrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmrTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
