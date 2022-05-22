import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaxAdditiveDialogComponent } from './tax-additive-dialog.component';

@NgModule({
  declarations: [
    TaxAdditiveDialogComponent
  ],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    TaxAdditiveDialogComponent
  ]
})
export class TaxAdditiveDialogModule { }
