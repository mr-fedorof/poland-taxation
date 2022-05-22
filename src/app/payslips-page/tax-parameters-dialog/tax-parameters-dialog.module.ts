import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TaxParametersModule } from '../tax-parameters/tax-parameters.module';
import { TaxParametersDialogComponent } from './tax-parameters-dialog.component';

@NgModule({
  declarations: [
    TaxParametersDialogComponent,
  ],
  imports: [
    TaxParametersModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    TaxParametersDialogComponent,
  ]
})
export class TaxParametersDialogModule { }
