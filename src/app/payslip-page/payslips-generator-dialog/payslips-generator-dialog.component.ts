import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MONTHS } from '../../../modules/date';
import { TaxParameters } from '../tax-parameters/tax-parameters.model';

@Component({
  selector: 'app-payslips-generator-dialog',
  templateUrl: './payslips-generator-dialog.component.html',
  styleUrls: ['./payslips-generator-dialog.component.scss']
})
export class PayslipsGeneratorDialogComponent implements OnInit {
  public months: string[] = MONTHS;
  public form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<PayslipsGeneratorDialogComponent>
  ) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      baseSalary: this.formBuilder.control(16500, [
        Validators.required,
        Validators.min(0)
      ]),
      fullName: this.formBuilder.control('John Wick', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(32)
      ]),
      pkupEnabled: this.formBuilder.control(true),
      taxParameters: this.formBuilder.control(null, [
        Validators.required
      ]),
    });
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onTaxParametersChange(taxParameters: TaxParameters): void {
    this.form.controls['taxParameters'].setValue(taxParameters);
  }
}
