import { Component } from '@angular/core';
import { MONTHS } from '../../modules/date';

@Component({
  selector: 'app-payslip-page',
  templateUrl: './payslip-page.component.html',
  styleUrls: ['./payslip-page.component.scss']
})
export class PayslipPageComponent {
  public readonly months: string[] = MONTHS;
  public readonly currentMonth: number = new Date().getMonth();
}
