import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootandzoneComponent } from './bootandzone.component';

describe('BootandzoneComponent', () => {
  let component: BootandzoneComponent;
  let fixture: ComponentFixture<BootandzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootandzoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootandzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
