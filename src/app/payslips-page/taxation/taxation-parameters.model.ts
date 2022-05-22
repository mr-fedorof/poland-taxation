import { TaxAdditiveValue } from './tax-additive-value.model';

export interface TaxationParameters {
  taxAdditiveValues: TaxAdditiveValue[];
  pkup: number;
  ppkEnabled: boolean;
  ppkBasicEmployee: number;
  ppkBasicEmployer: number;
  ppkAdditionEmployee: number;
  ppkAdditionEmployer: number;
  liveOutside: boolean;
  pit2Enabled: boolean;
  tax1: number;
  tax2: number;
  tax3: number;
  taxThreshold12: number;
  taxThreshold23: number;
  retirementDisabilityBaseThreshold: number;
  cumulativeTaxBase: number;
  cumulativeRetirementDisabilityBase: number;
}
