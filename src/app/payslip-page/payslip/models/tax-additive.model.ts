import { TaxElementId } from './tax-element-id.model';

export interface TaxAdditive {
  id: TaxElementId;
  name: string;
  title: string;
  description: string;
  taxable: boolean;
}
