import { NgModule } from '@angular/core';
import { PaymentsTableComponent } from './payments-table/payments-table.component';
import { PaymentsModalComponent } from './payments-modal/payments-modal.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

@NgModule({
  declarations: [],
  imports: [
    PaymentsTableComponent,
    PaymentsModalComponent,
    DashboardHeaderComponent,
  ],
  exports: [
    PaymentsTableComponent,
    PaymentsModalComponent,
    DashboardHeaderComponent,
  ],
  providers: [],
})
export class DashboardModule {}
