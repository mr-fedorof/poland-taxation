import { Component } from '@angular/core';
import { MONTHS } from '../../modules/date';

@Component({
  selector: 'app-taxation',
  templateUrl: './taxation.component.html',
  styleUrls: ['./taxation.component.scss']
})
export class TaxationComponent {
  public readonly months: string[] = MONTHS;
  public readonly currentMonth: number = new Date().getMonth();
}
