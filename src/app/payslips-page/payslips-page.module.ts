import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PayslipsPageComponent } from './payslips-page.component';
import { PayslipModule } from './payslip/payslip.module';
import { PayslipsGeneratorDialogModule } from './payslips-generator-dialog/payslips-generator-dialog.module';
import { CurrencyPlnPipe } from './pipes/currency-pln.pipe';
import { TaxAdditiveDialogModule } from './tax-additive-dialog/tax-additive-dialog.module';
import { TaxParametersDialogModule } from './tax-parameters-dialog/tax-parameters-dialog.module';
import { TaxParametersModule } from './tax-parameters/tax-parameters.module';

@NgModule({
  declarations: [
    PayslipsPageComponent,
    CurrencyPlnPipe
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
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    TaxParametersDialogModule,
  ],
  exports: [
    PayslipsPageComponent
  ]
})
export class PayslipsPageModule { }
