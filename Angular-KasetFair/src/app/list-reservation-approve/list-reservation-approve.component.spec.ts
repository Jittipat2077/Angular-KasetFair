import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationApproveComponent } from './list-reservation-approve.component';

describe('ListReservationApproveComponent', () => {
  let component: ListReservationApproveComponent;
  let fixture: ComponentFixture<ListReservationApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListReservationApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
