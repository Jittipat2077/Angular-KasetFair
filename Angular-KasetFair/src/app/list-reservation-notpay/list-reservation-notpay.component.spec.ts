import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationNotpayComponent } from './list-reservation-notpay.component';

describe('ListReservationNotpayComponent', () => {
  let component: ListReservationNotpayComponent;
  let fixture: ComponentFixture<ListReservationNotpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationNotpayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListReservationNotpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
