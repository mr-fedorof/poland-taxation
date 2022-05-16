import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxAdditive } from '../../services/taxation.service';

@Component({
  selector: 'app-tax-additive',
  templateUrl: './tax-additive.component.html',
  styleUrls: ['./tax-additive.component.scss']
})
export class TaxAdditiveComponent {
  public taxAdditives: TaxAdditive[] = [];
  public taxAdditive: TaxAdditive | null = null;
  public taxAdditiveValue: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { taxAdditives: TaxAdditive[] },
    private readonly dialogRef: MatDialogRef<TaxAdditiveComponent>
  ) {
    this.taxAdditives = data.taxAdditives;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
