import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReservationComponent } from './approve-reservation.component';

describe('ApproveReservationComponent', () => {
  let component: ApproveReservationComponent;
  let fixture: ComponentFixture<ApproveReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
