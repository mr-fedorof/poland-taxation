import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { PayslipComponent } from './payslip.component';
import { TaxAdditiveComponent } from './tax-additive/tax-additive.component';
import {
  TaxElementExplanationDialogComponent
} from './tax-element-explanation-dialog/tax-element-explanation-dialog.component';
import { TaxElementComponent } from './tax-element/tax-element.component';

@NgModule({
  declarations: [
    PayslipComponent,
    TaxAdditiveComponent,
    TaxElementExplanationDialogComponent,
    TaxElementComponent
  ],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    SatPopoverModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule
  ],
  exports: [
    PayslipComponent
  ]
})
export class PayslipModule { }
