import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaxParametersModule } from '../tax-parameters/tax-parameters.module';
import { PayslipsGeneratorDialogComponent } from './payslips-generator-dialog.component';

@NgModule({
  declarations: [
    PayslipsGeneratorDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    TaxParametersModule,
    MatCheckboxModule,
  ],
  exports: [
    PayslipsGeneratorDialogComponent
  ]
})
export class PayslipsGeneratorDialogModule { }
