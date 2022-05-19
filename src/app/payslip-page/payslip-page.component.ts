import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MONTHS } from '../../modules/date';
import { MonthConfiguration } from './models/month-configuration.model';
import { PayslipsConfiguration } from './payslips-generator-dialog/payslips-configuration.model';
import { PayslipsGeneratorDialogComponent } from './payslips-generator-dialog/payslips-generator-dialog.component';

@Component({
  selector: 'app-payslip-page',
  templateUrl: './payslip-page.component.html',
  styleUrls: ['./payslip-page.component.scss']
})
export class PayslipPageComponent {
  public readonly months: string[] = MONTHS;
  public monthConfigurations: MonthConfiguration[] = [];

  constructor(private readonly dialog: MatDialog) {
  }

  public onAddPayslip(): void {
    const dialogRef: MatDialogRef<PayslipsGeneratorDialogComponent> = this.dialog.open(PayslipsGeneratorDialogComponent, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe((payslipsConfiguration: PayslipsConfiguration) => {
      this.monthConfigurations = this.months.map((_, index) => ({
        monthIndex: index,
        baseSalary: payslipsConfiguration.baseSalary
      }));
    });
  }
}
