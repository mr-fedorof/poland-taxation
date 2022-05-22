import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPln'
})
export class CurrencyPlnPipe implements PipeTransform {
  public transform(value: number): string {
    return formatCurrency(value, 'en-US', '', 'PLN', '1.2-2')
  }
}
