import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { PayslipPageComponent } from './payslip-page.component';
import { PayslipModule } from './payslip/payslip.module';
import { MonthDialogModule } from './payslips-generator-dialog/month-dialog.module';

@NgModule({
  declarations: [
    PayslipPageComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    PayslipModule,
    MonthDialogModule
  ],
  exports: [
    PayslipPageComponent
  ]
})
export class PayslipPageModule { }
