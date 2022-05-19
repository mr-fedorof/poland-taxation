import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MONTHS } from '../../../modules/date';

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
      baseSalary: this.formBuilder.control(10000, [
        Validators.required,
        Validators.min(0)
      ]),
    });
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
