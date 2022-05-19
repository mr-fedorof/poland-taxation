import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxAdditiveElement } from '../models/tax-additive-element.model';

@Component({
  selector: 'app-tax-additive',
  templateUrl: './tax-additive.component.html',
  styleUrls: ['./tax-additive.component.scss']
})
export class TaxAdditiveComponent {
  public taxAdditives: TaxAdditiveElement[] = [];
  public taxAdditive: TaxAdditiveElement | null = null;
  public taxAdditiveValue: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { taxAdditives: TaxAdditiveElement[] },
    private readonly dialogRef: MatDialogRef<TaxAdditiveComponent>
  ) {
    this.taxAdditives = data.taxAdditives;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
