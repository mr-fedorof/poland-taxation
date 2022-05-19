import { Injectable } from '@angular/core';

export interface TaxationParameters {
  taxAdditives: TaxAdditiveValue[];
  pkup: number;
  ppkEnabled: boolean;
  liveOutside: boolean;
  pit2Enabled: boolean;
  tax1: number;
  tax2: number;
  tax3: number;
  taxThreshold12: number;
  taxThreshold23: number;
  retirementDisabilityBaseThreshold: number;
}

export interface TaxAdditiveValue {
  name: string;
  taxable: boolean;
  value: number;
}

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

export interface DistributeTax {
  base: number | null;
  employer: number;
  employee: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaxationService {
  public calculate(taxationParameters: TaxationParameters): Taxation {
    const ppkEnabled: boolean = taxationParameters.ppkEnabled;
    const totalGross: number = taxationParameters.taxAdditives
      .filter(_ => _.taxable)
      .map(_ => _.value)
      .reduce((p, c) => p + c, 0);
    const pkup: number = taxationParameters.pkup;
    const liveOutside: boolean = taxationParameters.liveOutside;
    const pit2Enabled: boolean = taxationParameters.pit2Enabled;
    const tax1: number = taxationParameters.tax1;
    const taxThreshold12: number = taxationParameters.taxThreshold12;
    const tax2: number = taxationParameters.tax2;
    const taxThreshold23: number = taxationParameters.taxThreshold23;
    const tax3: number = taxationParameters.tax3;
    const retirementDisabilityBaseThreshold: number = taxationParameters.retirementDisabilityBaseThreshold;

    const socialContributionBase: number = totalGross;
    // Substruct
    // Sick pay - wynagr.chorobowe
    // Sick allowance - zasiłek chorobowy
    // Care allowance - zas.opiekuńczy
    // Maternity / paternity / parental allowance - zas.macierzyński
    // PPK income - Przychód z tytułu PPK/E

    const retirement: DistributeTax = {
      base: socialContributionBase,
      employee: socialContributionBase * 0.0976,
      employer: socialContributionBase * 0.0976
    };
    const disability: DistributeTax = {
      base: socialContributionBase,
      employee: socialContributionBase * 0.015,
      employer: socialContributionBase * 0.065
    };
    const sickness: DistributeTax = {
      base: socialContributionBase,
      employee: socialContributionBase * 0.0245,
      employer: 0
    };
    const accident: DistributeTax = {
      base: socialContributionBase,
      employee: 0,
      employer: socialContributionBase * 0.0067
    };
    const fp: DistributeTax = {
      base: socialContributionBase,
      employee: 0,
      employer: socialContributionBase * 0.0245
    };
    const fgsp: DistributeTax = {
      base: socialContributionBase,
      employee: 0,
      employer: socialContributionBase * 0.001
    };
    const fep: DistributeTax = {
      base: socialContributionBase,
      employee: 0,
      employer: 0
    };
    const socialContribution: DistributeTax = {
      base: null,
      employee: this.sum(
        retirement.employee,
        disability.employee,
        sickness.employee),
      employer: this.sum(
        retirement.employer,
        disability.employer,
        accident.employer,
        fgsp.employer,
        fp.employer),
    };

    const ppkBasicContribution: DistributeTax = {
      base: ppkEnabled ? socialContributionBase : 0,
      employee: ppkEnabled ? socialContributionBase * 0.02 : 0,
      employer: ppkEnabled ? socialContributionBase * 0.015 : 0
    };
    const ppkAdditionalContribution: DistributeTax = {
      base: ppkEnabled ? socialContributionBase : 0,
      employee: 0,
      employer: 0
    };

    // HEALTH INSURANCE CONTRIBUTION
    // Health insurance contribution is obligatory (even if you use Medicover / Luxmed health care)
    // Base of Health contribution (PODST. ZDROW.) = Total gross amount (SUMA) - sum of Employee's ZUS contributions (RAZEM SKŁ. ZUS / UBEZPIECZ. Line) – PPK income (Przychód z tytułu PPK/E)**
    // **only if you are enrolled with PPK (=> if shown on your payslip)
    // Health insurance is 9% of the health insurance basis (PODST.ZDROW)
    const healthInsuranceContributionBase: number = totalGross - this.sum(
      socialContribution.employee,
      ppkBasicContribution.employer,
      ppkAdditionalContribution.employer
    );

    const healthInsuranceContribution: DistributeTax = {
      base: healthInsuranceContributionBase,
      employee: healthInsuranceContributionBase * 0.09,
      employer: 0
    };


    // Amount of the employee's deductible expenses in given month:
    // 250 - standard deductible costs (if you live in the city you work)
    // 300 - increased deductible costs (if you live outside of the city you work)
    // NOTE: This amount includes 50% copyright costs (PKUP) + deductible costs of 250,00 or 300,00 (depending on employee’s declaration):
    // [Honorarium_PKUP – (Honorarium_PKUP * 13,71%) ] * 50% + 250 (or 300) = KOSZTY
    const deductibleExpenses: number = (pkup - (pkup * 0.1371)) * 0.5 + (liveOutside ? 300 : 250);

    // “Middle class relief” – amount depends on the monthly gross income:
    // Gross income is in the range 5 701 - 8 549 PLN => (Income * 6.68% – 380,50 PLN) ÷ 17%
    // Gross income is in the range 8 549 – 11 141 PLN => (Income * (-7.35%) + 819,08 PLN) ÷ 17%
    // Sick leave allowances are excluded from “middle class relief”
    let middleClassTaxRelief: number = 0;

    if (totalGross >= 5701 && totalGross <= 8549) {
      middleClassTaxRelief += (totalGross * 0.0668 - 380.50) / 0.017;
    }

    if (totalGross > 8549 && totalGross <= 11141) {
      middleClassTaxRelief += (819.08 - (totalGross * 0.0735)) / 0.017;
    }

    let taxRelief: number = 0;

    if (pit2Enabled) {
      taxRelief += 5100 / 12;
    }

    // Income tax paid to the Tax Office and deducted from gross pay
    // Taxable elements - Sum of employee’s social contributions – KOSZTY – ULGA PRAC. = Tax base (rounded to full PLN)
    const taxBase: number = Math.max(totalGross - socialContribution.employee - deductibleExpenses - middleClassTaxRelief, 0);
    const taxBaseRound: number = Math.round(taxBase);

    const cumulativeTaxBase: number = taxBase;
    const cumulativeTaxBaseRound: number = Math.round(cumulativeTaxBase);
    const cumulativeRetirementDisabilityBase: number = socialContributionBase;

    // Procent podatku (tax %) -17% or 32% (or 17% / 32% in the month when the threshold of 120 000 PLN is reached)
    const incomeTax1: number = (function(){
      let t = Math.min(cumulativeTaxBaseRound, taxThreshold12);

      return Math.round(t * tax1 / 100);
    })();

    const incomeTax2: number = (function(){
      let t = cumulativeTaxBaseRound - taxThreshold12;
      if (t < 0) {
        return 0;
      }

      t = Math.min(t, taxThreshold23);

      return Math.round(t * tax2 / 100);
    })();

    const incomeTax3: number = (function(){
      let t = cumulativeTaxBaseRound - taxThreshold23;
      if (t < 0) {
        return 0;
      }

      return Math.round(t * tax3 / 100);
    })();

    const incomeTax: number = Math.max(incomeTax1 + incomeTax2 + incomeTax3 - taxRelief, 0);

    // RAZEM / ROR  = SUMA - Pakiet (MyBenefit) - RAZEM SKŁ. ZUS  {UBEZPIECZ. Line} - ZDROW. - ZAL. POD - PPK P {UBEZPIECZ. + PŁATNIK lines}
    const totalNet: number = totalGross - this.sum(
      socialContribution.employee,
      healthInsuranceContribution.employee,
      incomeTax,
      ppkBasicContribution.employee,
      ppkBasicContribution.employer
    );

    return {
      retirement: retirement,
      disability: disability,
      sickness: sickness,
      accident: accident,
      fp: fp,
      fgsp: fgsp,
      fep: fep,
      socialContribution: socialContribution,
      ppkBasicContribution: ppkBasicContribution,
      ppkAdditionalContribution: ppkAdditionalContribution,
      healthInsuranceContribution: healthInsuranceContribution,
      cumulativeTaxBase: cumulativeTaxBase,
      cumulativeRetirementDisabilityBase: cumulativeRetirementDisabilityBase,
      incomeTax: incomeTax,
      deductibleExpenses: deductibleExpenses,
      middleClassTaxRelief: middleClassTaxRelief,
      taxRelief: taxRelief,
      socialContributionBase: socialContributionBase,
      totalNet: totalNet
    };
  }

  private sum(...args: number[]) {
    let r: number = 0;

    args.forEach(v => r += v);

    return r;
  }
}
