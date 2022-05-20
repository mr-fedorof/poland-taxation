import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { PayslipComponent } from './payslip.component';
import {
  TaxElementExplanationDialogComponent
} from './tax-element-explanation-dialog/tax-element-explanation-dialog.component';
import { TaxElementComponent } from './tax-element/tax-element.component';

@NgModule({
  declarations: [
    PayslipComponent,
    TaxElementExplanationDialogComponent,
    TaxElementComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    SatPopoverModule,
    MatIconModule,
  ],
  exports: [
    PayslipComponent
  ]
})
export class PayslipModule { }
