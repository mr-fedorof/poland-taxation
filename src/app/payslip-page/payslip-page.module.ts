import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PayslipModule } from './payslip/payslip.module';
import { PayslipPageRoutingModule } from './payslip-page-routing.module';
import { PayslipPageComponent } from './payslip-page.component';

@NgModule({
  declarations: [
    PayslipPageComponent
  ],
  imports: [
    PayslipPageRoutingModule,
    MatSidenavModule,
    MatListModule,
    PayslipModule
  ],
  exports: [
    PayslipPageComponent
  ]
})
export class PayslipPageModule { }
