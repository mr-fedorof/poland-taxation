import { TaxElementId } from './tax-element-id.model';

export interface TaxElement {
  id: TaxElementId;
  name: string;
  title: string;
  description: string;
  formula?: string;
}
