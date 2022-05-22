import { Component, Inject, OnInit } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxAdditiveElement } from '../payslip/models/tax-additive-element.model';
import { TaxParameters } from '../tax-parameters/tax-parameters.model';
import { TaxAdditiveValue } from '../taxation/tax-additive-value.model';

export interface TaxParametersDialogOptions {
  taxParameters: TaxParameters;
  pkupEnabled: boolean;
}

@Component({
  selector: 'app-tax-parameters-dialog',
  templateUrl: './tax-parameters-dialog.component.html',
  styleUrls: ['./tax-parameters-dialog.component.scss']
})
export class TaxParametersDialogComponent {
  public taxParameters: TaxParameters;
  public isValid: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly options: TaxParametersDialogOptions,
    private readonly dialogRef: MatDialogRef<TaxParametersDialogComponent>
  ) {
    this.taxParameters = {
      ...options.taxParameters
    };
  }

  public onTaxParametersChange(taxParameters: TaxParameters): void {
    this.taxParameters = taxParameters;
  }

  public onTaxParametersValidationChange(status: FormControlStatus): void {
    this.isValid = status === 'VALID';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
