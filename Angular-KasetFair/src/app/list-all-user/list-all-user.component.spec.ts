import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllUserComponent } from './list-all-user.component';

describe('ListAllUserComponent', () => {
  let component: ListAllUserComponent;
  let fixture: ComponentFixture<ListAllUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
