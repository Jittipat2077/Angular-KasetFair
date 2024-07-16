import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUserComponent } from './payment-user.component';

describe('PaymentUserComponent', () => {
  let component: PaymentUserComponent;
  let fixture: ComponentFixture<PaymentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
