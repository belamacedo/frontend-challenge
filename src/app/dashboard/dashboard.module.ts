import { NgModule } from "@angular/core";
import { PaymentsTableComponent } from "./payments-table/payments-table.component";
import { PaymentsModalComponent } from "./payments-modal/payments-modal.component";

@NgModule({
  declarations: [],
  imports: [
  PaymentsTableComponent, PaymentsModalComponent
  ],
  exports: [
    PaymentsTableComponent, PaymentsModalComponent
  ],
  providers: [],
})
export class DashboardModule { }
