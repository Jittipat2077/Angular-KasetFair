import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBootComponent } from './edit-boot.component';

describe('EditBootComponent', () => {
  let component: EditBootComponent;
  let fixture: ComponentFixture<EditBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
