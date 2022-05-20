import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { PayslipPageComponent } from './payslip-page.component';
import { PayslipModule } from './payslip/payslip.module';
import { PayslipsGeneratorDialogModule } from './payslips-generator-dialog/payslips-generator-dialog.module';
import { TaxAdditiveDialogModule } from './tax-additive-dialog/tax-additive-dialog.module';
import { TaxParametersModule } from './tax-parameters/tax-parameters.module';

@NgModule({
  declarations: [
    PayslipPageComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    PayslipModule,
    PayslipsGeneratorDialogModule,
    TaxParametersModule,
    TaxAdditiveDialogModule,
    MatDividerModule,
  ],
  exports: [
    PayslipPageComponent
  ]
})
export class PayslipPageModule { }
