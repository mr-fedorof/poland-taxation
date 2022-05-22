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
  ppkEmployeeContribution: number;
  ppkEmployerContribution: number;
  ppkContribution: number;
  healthInsuranceContribution: DistributeTax;
  cumulativeTaxBase: number;
  cumulativeRetirementDisabilityBase: number;
  incomeTax: number;
  incomeTax1: number;
  incomeTax2: number;
  incomeTax3: number;
  deductibleExpenses: number;
  middleClassTaxRelief: number;
  taxRelief: number;
  socialContributionBase: number;
  totalNet: number;
}
