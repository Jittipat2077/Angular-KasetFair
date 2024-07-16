import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBootComponent } from './add-boot.component';

describe('AddBootComponent', () => {
  let component: AddBootComponent;
  let fixture: ComponentFixture<AddBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
