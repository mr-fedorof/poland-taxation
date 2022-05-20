import { DistributeTax } from './distribute-tax.model';

export interface Taxation {
  retirement: DistributeTax;
  disability: DistributeTax;
  sickness: DistributeTax;
  accident: DistributeTax;
  fp: DistributeTax;
  fgsp: DistributeTax;
  fep: DistributeTax;
  socialContribution: DistributeTax;
  ppkBasicContribution: DistributeTax;
  ppkAdditionalContribution: DistributeTax;
  healthInsuranceContribution: DistributeTax;
  cumulativeTaxBase: number;
  cumulativeRetirementDisabilityBase: number;
  incomeTax: number;
  deductibleExpenses: number;
  middleClassTaxRelief: number;
  taxRelief: number;
  socialContributionBase: number;
  totalNet: number;
}
