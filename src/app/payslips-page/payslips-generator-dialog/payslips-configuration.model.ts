import { TaxParameters } from '../tax-parameters/tax-parameters.model';

export interface PayslipsConfiguration {
  fullName: string;
  baseSalary: number;
  pkupEnabled: boolean;
  taxParameters: TaxParameters
}
