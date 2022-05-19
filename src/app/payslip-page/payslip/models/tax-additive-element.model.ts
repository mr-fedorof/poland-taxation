import { TaxElementId } from './tax-element-id.model';
import { TaxElement } from './tax-element.model';

export interface TaxAdditiveElement extends TaxElement {
  taxable: boolean;
  taxableValueId?: TaxElementId;
  nonTaxableValueId?: TaxElementId;
  system?: boolean;
}
