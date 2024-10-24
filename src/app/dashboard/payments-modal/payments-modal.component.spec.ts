import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsModalComponent } from './payments-modal.component';

describe('PaymentsModalComponent', () => {
  let component: PaymentsModalComponent;
  let fixture: ComponentFixture<PaymentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
