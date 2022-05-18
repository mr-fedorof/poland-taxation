import { Injectable } from '@angular/core';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';

@Injectable({
  providedIn: 'root'
})
export class TaxElementsCollection {
  public readonly employeeTaxElement: TaxElement = {
    id: TaxElementId.Employee,
    name: 'UBEZPIECZ',
    hint: 'Работник',
  }

  public readonly employerTaxElement: TaxElement = {
    id: TaxElementId.Employer,
    name: 'PŁATNIK',
    hint: 'Работодатель',
  }

  public readonly baseTaxElement: TaxElement = {
    id: TaxElementId.Base,
    name: 'PODSTAWA',
    hint: 'Основа',
  }

  public readonly totalGrossTaxElement: TaxElement = {
    id: TaxElementId.TotalGross,
    name: 'SUMA',
  }

  public readonly totalGrossValueTaxElement: TaxElement = {
    id: TaxElementId.TotalGrossValue,
    name: 'SUMA',
  }

  public readonly pkupTaxElement: TaxElement = {
    id: TaxElementId.PkupTaxAdditive,
    name: 'Honorarium_PKUP',
  }

  public readonly pkupValueTaxElement: TaxElement = {
    id: TaxElementId.PkupTaxAdditiveValue,
    name: 'Honorarium_PKUP',
  }

  public readonly pkupReduceTaxElement: TaxElement = {
    id: TaxElementId.PkupReduceTaxAdditive,
    name: 'Honorarium_pomniejszenie',
  }

  public readonly pkupReduceValueTaxElement: TaxElement = {
    id: TaxElementId.PkupReduceTaxAdditiveValue,
    name: 'Honorarium_pomniejszenie',
  }

  public readonly retirementTaxElement: TaxElement = {
    id: TaxElementId.Retirement,
    name: 'EMER',
    hint: 'Пенсионное обеспечение',
  }

  public readonly retirementBaseTaxElement: TaxElement = {
    id: TaxElementId.RetirementBase,
    name: 'EMER (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly retirementEmployerTaxElement: TaxElement = {
    id: TaxElementId.RetirementEmployer,
    name: 'EMER (P)',
    formula: `[${TaxElementId.RetirementBase}] * 9.76%`,
  }

  public readonly retirementEmployeeTaxElement: TaxElement = {
    id: TaxElementId.RetirementEmployee,
    name: 'EMER (U)',
    formula: `[${TaxElementId.RetirementBase}] * 9.76%`,
  }

  public readonly disabilityTaxElement: TaxElement = {
    id: TaxElementId.Disability,
    name: 'RENT',
    hint: 'Обеспечение по инвалидности',
  }

  public readonly disabilityBaseTaxElement: TaxElement = {
    id: TaxElementId.DisabilityBase,
    name: 'RENT (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly disabilityEmployerTaxElement: TaxElement = {
    id: TaxElementId.DisabilityEmployer,
    name: 'RENT (P)',
    formula: `[${TaxElementId.DisabilityBase}] * 6.5%`,
  }

  public readonly disabilityEmployeeTaxElement: TaxElement = {
    id: TaxElementId.DisabilityEmployee,
    name: 'RENT (U)',
    formula: `[${TaxElementId.DisabilityBase}] * 1.5%`,
  }

  public readonly sicknessTaxElement: TaxElement = {
    id: TaxElementId.Sickness,
    name: 'CHOR',
    hint: 'Оплата больничного',
  }

  public readonly sicknessBaseTaxElement: TaxElement = {
    id: TaxElementId.SicknessBase,
    name: 'CHOR (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly sicknessEmployerTaxElement: TaxElement = {
    id: TaxElementId.SicknessEmployer,
    name: 'CHOR (P)',
    hint: `Не оплачивается`,
  }

  public readonly sicknessEmployeeTaxElement: TaxElement = {
    id: TaxElementId.SicknessEmployee,
    name: 'CHOR (U)',
    formula: `[${TaxElementId.SicknessBase}] * 2.45%`,
  }

  public readonly accidentTaxElement: TaxElement = {
    id: TaxElementId.Accident,
    name: 'WYP',
    hint: 'Страховка от несчастных случаев',
  }

  public readonly accidentBaseTaxElement: TaxElement = {
    id: TaxElementId.AccidentBase,
    name: 'WYP (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly accidentEmployerTaxElement: TaxElement = {
    id: TaxElementId.AccidentEmployer,
    name: 'WYP (P)',
    formula: `[${TaxElementId.AccidentBase}] * 0.67%`,
  }

  public readonly accidentEmployeeTaxElement: TaxElement = {
    id: TaxElementId.AccidentEmployee,
    name: 'WYP (U)',
    hint: `Не оплачивается`,
  }

  public readonly fpTaxElement: TaxElement = {
    id: TaxElementId.Fp,
    name: 'FP',
    hint: 'Фонд труда',
  }

  public readonly fpBaseTaxElement: TaxElement = {
    id: TaxElementId.FpBase,
    name: 'FP (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly fpEmployerTaxElement: TaxElement = {
    id: TaxElementId.FpEmployer,
    name: 'FP (P)',
    formula: `[${TaxElementId.FpBase}] * 2.45%`,
  }

  public readonly fpEmployeeTaxElement: TaxElement = {
    id: TaxElementId.FpEmployee,
    name: 'FP (U)',
    hint: `Не оплачивается`,
  }

  public readonly fgspTaxElement: TaxElement = {
    id: TaxElementId.Fgsp,
    name: 'FGŚP',
    hint: 'Фонд гарантированных вознаграждений работникам',
  }

  public readonly fgspBaseTaxElement: TaxElement = {
    id: TaxElementId.FgspBase,
    name: 'FGŚP (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly fgspEmployerTaxElement: TaxElement = {
    id: TaxElementId.FgspEmployer,
    name: 'FGŚP (P)',
    formula: `[${TaxElementId.FgspBase}] * 0.1%`,
  }

  public readonly fgspEmployeeTaxElement: TaxElement = {
    id: TaxElementId.FgspEmployee,
    name: 'FGŚP (U)',
    hint: `Не оплачивается`,
  }

  public readonly fepTaxElement: TaxElement = {
    id: TaxElementId.Fep,
    name: 'FEP',
  }

  public readonly fepBaseTaxElement: TaxElement = {
    id: TaxElementId.FepBase,
    name: 'FEP (POD)',
  }

  public readonly fepEmployerTaxElement: TaxElement = {
    id: TaxElementId.FepEmployer,
    name: 'FEP',
  }

  public readonly fepEmployeeTaxElement: TaxElement = {
    id: TaxElementId.FepEmployee,
    name: 'FEP',
  }

  public readonly socialContributionTaxElement: TaxElement = {
    id: TaxElementId.SocialContribution,
    name: 'RAZEM SKŁ. ZUS',
    hint: 'Социальные платежи'
  }

  public readonly socialContributionEmployerTaxElement: TaxElement = {
    id: TaxElementId.SocialContributionEmployer,
    name: 'RAZEM SKŁ. ZUS',
    formula: `[${TaxElementId.TotalGrossValue}] - ([${TaxElementId.RetirementEmployer}] + [${TaxElementId.DisabilityEmployer}] + [${TaxElementId.AccidentEmployer}] + [${TaxElementId.FpEmployer}] + [${TaxElementId.FgspEmployer}])`
  }

  public readonly socialContributionEmployeeTaxElement: TaxElement = {
    id: TaxElementId.SocialContributionEmployee,
    name: 'RAZEM SKŁ. ZUS',
    formula: `[${TaxElementId.TotalGrossValue}] - ([${TaxElementId.RetirementEmployee}] + [${TaxElementId.DisabilityEmployee}] + [${TaxElementId.SicknessEmployee}])`
  }

  public readonly ppkBasicContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContribution,
    name: 'PPK P',
    hint: 'Основной PPK',
  }

  public readonly ppkBasicContributionBaseTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContributionBase,
    name: 'PPK P (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly ppkBasicContributionEmployeeTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContributionEmployee,
    name: 'PPK P (U)',
    formula: `[${TaxElementId.PpkBasicContributionBase}] * 2%`,
  }

  public readonly ppkBasicContributionEmployerTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContributionEmployer,
    name: 'PPK P (P)',
    formula: `[${TaxElementId.PpkBasicContributionBase}] * 1.5%`,
  }

  public readonly ppkAdditionalContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContribution,
    name: 'PPK D',
    hint: 'Дополнительный PPK',
  }

  public readonly ppkAdditionalContributionBaseTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContributionBase,
    name: 'PPK D (POD)',
    formula: `[${TaxElementId.TotalGrossValue}]`,
  }

  public readonly ppkAdditionalContributionEmployeeTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContributionEmployee,
    name: 'PPK D (U)',
    formula: `[${TaxElementId.PpkAdditionalContributionBase}] * 0%`,
  }

  public readonly ppkAdditionalContributionEmployerTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContributionEmployer,
    name: 'PPK D (P)',
    formula: `[${TaxElementId.PpkAdditionalContributionBase}] * 0%`,
  }

  public readonly healthInsuranceContributionBaseElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContributionBase,
    name: 'PODST. ZDROW.',
    hint: 'Основа вычета для доступа к медицине',
  }

  public readonly healthInsuranceContributionBaseValueElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContributionBaseValue,
    name: 'PODST. ZDROW.',
    formula: `[${TaxElementId.TotalGrossValue}] - ([${TaxElementId.SocialContributionEmployee}] + [${TaxElementId.PpkBasicContributionEmployer}] + [${TaxElementId.PpkAdditionalContributionEmployer}])`,
  }

  public readonly healthInsuranceContributionElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContribution,
    name: 'ZDROW.',
    hint: 'Доступ к медицине',
  }

  public readonly healthInsuranceContributionValueElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContributionValue,
    name: 'ZDROW.',
    formula: `[${TaxElementId.HealthInsuranceContributionBaseValue}] * 9%`,
  }

  public readonly zaniechPodElement: TaxElement = {
    id: TaxElementId.ZaniechPod,
    name: 'ZANIECH. POD.',
  }

  public readonly incomeTaxElement: TaxElement = {
    id: TaxElementId.IncomeTax,
    name: 'ZAL. POD.',
    hint: 'Подоходный налог',
  }

  public readonly incomeTaxValueElement: TaxElement = {
    id: TaxElementId.IncomeTaxValue,
    name: 'ZAL. POD.',
    formula: `Round([${TaxElementId.TotalGrossValue}] - [${TaxElementId.SocialContributionEmployee}] - [${TaxElementId.DeductibleExpensesValue}] - [${TaxElementId.MiddleClassTaxReliefValue}])`
  }

  public readonly deductibleExpensesElement: TaxElement = {
    id: TaxElementId.DeductibleExpenses,
    name: 'KOSZTY',
    hint: 'Расходы работника (понижение налога)',
  }

  public readonly deductibleExpensesValueElement: TaxElement = {
    id: TaxElementId.DeductibleExpensesValue,
    name: 'KOSZTY',
    formula: `( [${TaxElementId.PkupTaxAdditiveValue}] – ([${TaxElementId.PkupTaxAdditiveValue}] * 13.71% [ social contribution ] ) ) * 50% + 250 [ if live inside ] + 300 [ if live outside ]`
  }

  public readonly middleClassTaxReliefElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxRelief,
    name: 'ULGA PRAC.',
    hint: 'Помощь среднему классу',
  }

  public readonly middleClassTaxReliefValueElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxReliefValue,
    name: 'ULGA PRAC.',
  }

  public readonly taxReliefElement: TaxElement = {
    id: TaxElementId.TaxRelief,
    name: 'ULGA POD.',
    hint: 'Понижение налога',
  }

  public readonly taxReliefValueElement: TaxElement = {
    id: TaxElementId.TaxReliefValue,
    name: 'ULGA POD.',
    hint: '5100 / 12 [ PIT-2 ]'
  }

  public readonly totalNetElement: TaxElement = {
    id: TaxElementId.TotalNet,
    name: 'RAZEM',
    hint: 'Зарплата NET'
  }

  public readonly totalNetValueElement: TaxElement = {
    id: TaxElementId.TotalNetValue,
    name: 'RAZEM',
    formula: `[${TaxElementId.TotalGrossValue}] - [${TaxElementId.SocialContributionEmployee}] - [${TaxElementId.HealthInsuranceContributionValue}] - [${TaxElementId.IncomeTaxValue}] - [${TaxElementId.PpkBasicContributionEmployee}] - [${TaxElementId.PpkAdditionalContributionEmployee}]`
  }

  public readonly cumulativeTaxBaseElement: TaxElement = {
    id: TaxElementId.CumulativeTaxBase,
    name: 'Podstawa podatku:',
    description: 'Amount of taxable income (tax base) from January to the current month' +
      '<\/br>' +
      'When the income exceeds the threshold of 120 000 PLN, it is taxed at higher rate (32% instead of 17%)' +
      '<\/br>' +
      'The amount is cumulative SUMA of taxable items reduced by social contributions and by Koszty'
  }

  public readonly retirementDisabilityCumulativeBaseElement: TaxElement = {
    id: TaxElementId.RetirementDisabilityCumulativeBase,
    name: 'Podstawa składek emer.-rent.',
    description: 'Cumulative base for EMER. and RENT. contributions (cumulative base from January to the current month).' +
      '<\/br>' +
      'Contributions EMER. & RENT are stopped until the end of the year when the annual limit is reached (the limit is shown in upper right corner of the payslip, line “Podstawa składek emer.-rent”)' +
      '<\/br>' +
      'The annual limit of the base in 2022 are 177 660,00 PLN'
  }

  public readonly taxPercentageElement: TaxElement = {
    id: TaxElementId.TaxPercentage,
    name: 'Procent podatku',
    description: '17% or 32% tax (or 17% / 32% in the month when the threshold of 120 000 PLN is reached)'
  }

  private readonly _all: TaxElement[] = Object.values(this).filter(_ => !!_.id && !!TaxElementId[_.id as TaxElementId]);
  private readonly _map: Map<TaxElementId, TaxElement> = new Map(this._all.map(_ => ([_.id, _])));

  public getById(id: TaxElementId): TaxElement {
    return this._map.get(id)!;
  }
}
