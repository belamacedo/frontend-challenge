import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsTableComponent } from './payments-table.component';
import { PaymentsService } from '../../../core/services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;
  let paymentsServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    paymentsServiceMock = {
      getPayments: jest.fn(),
      deletePayment: jest.fn(),
    };

    dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [
        PaymentsTableComponent,
        MockComponent(PaymentModalComponent),
      ],
      providers: [
        { provide: PaymentsService, useValue: paymentsServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
  });

  it('should load payments on init', () => {
    const mockPayments = [
      {
        id: 1,
        name: 'Pagamento 1',
        username: 'usuario1',
        title: 'Título 1',
        date: new Date(),
        isPayed: true,
        value: 100,
      },
      {
        id: 2,
        name: 'Pagamento 2',
        username: 'usuario2',
        title: 'Título 2',
        date: new Date(),
        isPayed: false,
        value: 200,
      },
    ];

    paymentsServiceMock.getPayments.mockReturnValue(of(mockPayments));

    component.ngOnInit();

    expect(paymentsServiceMock.getPayments).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockPayments);
  });

  it('should delete a payment', () => {
    const mockPayments = [
      {
        id: 1,
        name: 'Pagamento 1',
        username: 'usuario1',
        title: 'Título 1',
        date: new Date(),
        isPayed: true,
        value: 100,
      },
      {
        id: 2,
        name: 'Pagamento 2',
        username: 'usuario2',
        title: 'Título 2',
        date: new Date(),
        isPayed: false,
        value: 200,
      },
    ];

    component.dataSource.data = mockPayments;

    paymentsServiceMock.deletePayment.mockReturnValue(of(null));

    component.deletePayment(1);

    expect(paymentsServiceMock.deletePayment).toHaveBeenCalledWith(1);
    expect(component.dataSource.data).toEqual([mockPayments[1]]);
  });

  it('should open the payment modal', () => {
    component.openPaymentModal();

    expect(dialogMock.open).toHaveBeenCalledWith(PaymentModalComponent, {
      data: {
        dataSource: component.dataSource,
        isEdit: true,
        payment: null,
      },
    });
  });

  it('should reload payments when modal is closed', () => {
    const mockPayments = [
      {
        id: 1,
        name: 'Pagamento 1',
        username: 'usuario1',
        title: 'Título 1',
        date: new Date(),
        isPayed: true,
        value: 100,
      },
    ];

    paymentsServiceMock.getPayments.mockReturnValue(of(mockPayments));
    component.ngOnInit();

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true),
    });

    component.openPaymentModal();

    expect(paymentsServiceMock.getPayments).toHaveBeenCalled();
  });
});
