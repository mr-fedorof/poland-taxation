import { TaxElementId } from './tax-element-id.model';

export interface TaxAdditive {
  id: TaxElementId;
  name: string;
  taxable: boolean;
  title?: string;
  description?: string;
  hint?: string;
}
