import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBootComponent } from './detail-boot.component';

describe('DetailBootComponent', () => {
  let component: DetailBootComponent;
  let fixture: ComponentFixture<DetailBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
