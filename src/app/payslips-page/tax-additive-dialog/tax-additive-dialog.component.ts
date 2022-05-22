import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxAdditiveElement } from '../payslip/models/tax-additive-element.model';
import { TaxAdditiveValue } from '../taxation/tax-additive-value.model';

@Component({
  selector: 'app-tax-additive-dialog',
  templateUrl: './tax-additive-dialog.component.html',
  styleUrls: ['./tax-additive-dialog.component.scss']
})
export class TaxAdditiveDialogComponent {
  public taxAdditives: TaxAdditiveElement[] = [];
  public taxAdditive: TaxAdditiveElement | null = null;
  public taxAdditiveValue: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { taxAdditives: TaxAdditiveElement[], taxAdditiveValue: TaxAdditiveValue },
    private readonly dialogRef: MatDialogRef<TaxAdditiveDialogComponent>
  ) {
    this.taxAdditives = data.taxAdditives;

    this.taxAdditive = data.taxAdditives.find(_ => _.id === data.taxAdditiveValue?.id)!;
    this.taxAdditiveValue = data.taxAdditiveValue?.value;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
