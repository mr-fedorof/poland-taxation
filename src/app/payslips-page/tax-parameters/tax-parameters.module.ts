import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { TaxParametersComponent } from './tax-parameters.component';

@NgModule({
  declarations: [
    TaxParametersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSliderModule,
  ],
  exports: [
    TaxParametersComponent,
  ]
})
export class TaxParametersModule { }
