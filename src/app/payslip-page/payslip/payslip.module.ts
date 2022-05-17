import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaxElementExplanationDialogComponent } from './tax-element-explanation-dialog/tax-element-explanation-dialog.component';
import { PayslipComponent } from './payslip.component';
import { TaxAdditiveComponent } from './tax-additive/tax-additive.component';
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
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    PayslipComponent
  ]
})
export class PayslipModule { }
