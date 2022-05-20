import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MONTHS } from '../../../modules/date';
import { TaxAdditiveValue } from '../taxation/tax-additive-value.model';
import { Taxation } from '../taxation/taxation.model';
import { PayslipParameters } from './models/payslip-parameters.model';
import { TaxAdditiveElementsCollection } from './services/tax-additive-elements-collection.service';
import { TaxElementRegistryService } from './services/tax-element-registry.service';
import { TaxElementsCollection } from './services/tax-elements-collection.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TaxElementRegistryService
  ]
})
export class PayslipComponent {
  public readonly months: string[] = MONTHS;

  @Input() public payslipParameters!: PayslipParameters;
  @Input() public taxAdditiveValues!: TaxAdditiveValue[];
  @Input() public taxation!: Taxation;

  @Output() public taxAdditiveAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() public taxAdditiveEdit: EventEmitter<TaxAdditiveValue> = new EventEmitter<TaxAdditiveValue>();
  @Output() public taxAdditiveRemove: EventEmitter<TaxAdditiveValue> = new EventEmitter<TaxAdditiveValue>();

  constructor(
    public readonly taxElementsCollection: TaxElementsCollection,
    public readonly taxAdditivesCollection: TaxAdditiveElementsCollection
  ) {
  }

  public onAddTaxAdditiveClick(): void {
    this.taxAdditiveAdd.emit();
  }

  public onTaxAdditiveEditClick(taxAdditiveValue: TaxAdditiveValue): void {
    this.taxAdditiveEdit.emit(taxAdditiveValue);
  }

  public onTaxAdditiveDeleteClick(taxAdditiveValue: TaxAdditiveValue): void {
    this.taxAdditiveRemove.emit(taxAdditiveValue);
  }

  public sumTaxAdditives(taxAdditives: TaxAdditiveValue[], taxable: boolean): number {
    return taxAdditives.filter(_ => this.taxAdditivesCollection.getById(_.id)?.taxable === taxable).reduce((p, c) => p + c.value, 0);
  }
}
