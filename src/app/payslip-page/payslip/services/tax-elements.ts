import { Injectable } from '@angular/core';
import { TaxAdditive } from '../models/tax-additive.model';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';

@Injectable({
  providedIn: 'root'
})
export class TaxElements {
  public readonly totalGrossTaxElement: TaxElement = {
    id: TaxElementId.TotalGross,
    name: 'SUMA'
  }

  public readonly totalGrossValueTaxElement: TaxElement = {
    id: TaxElementId.TotalGrossValue,
    name: 'SUMA'
  }

  public readonly pkupTaxElement: TaxElement = {
    id: TaxElementId.Pkup,
    name: 'Honorarium_PKUP',
    title: '',
    description: ''
  }

  public readonly pkupReduceTaxElement: TaxElement = {
    id: TaxElementId.PkupReduce,
    name: 'Honorarium_pomniejszenie',
    title: '',
    description: ''
  }

  public readonly retirementTaxElement: TaxElement = {
    id: TaxElementId.Retirement,
    name: 'EMER',
    title: 'Взнос в пенсионное фонд'
  }

  public readonly retirementBaseTaxElement: TaxElement = {
    id: TaxElementId.RetirementBase,
    name: 'EMER',
    formula: 'A * 9.76%'
  }

  public readonly retirementEmployerTaxElement: TaxElement = {
    id: TaxElementId.RetirementEmployer,
    name: 'EMER (P)',
    formula: 'A * 9.76%'
  }

  public readonly retirementEmployeeTaxElement: TaxElement = {
    id: TaxElementId.RetirementEmployee,
    name: 'EMER (U)',
    formula: 'A * 9.76%'
  }

  public readonly disabilityTaxElement: TaxElement = {
    id: TaxElementId.Disability,
    name: 'RENT',
    title: 'Обеспечение по инвалидности',
    description: `
      <p>Работодатель - 6,5%</br>Работник - 1,5%</p>
      <p>Страхование на случай потери работоспособности – получение инвалидности, которая не позволит далее исполнять свои функции в полном объеме. Фонд, из которого будет формироваться пособие по инвалидностиs.</p>
    `
  }

  public readonly disabilityBaseTaxElement: TaxElement = {
    id: TaxElementId.DisabilityBase,
    name: 'RENT',
    formula: ''
  }

  public readonly disabilityEmployerTaxElement: TaxElement = {
    id: TaxElementId.DisabilityEmployer,
    name: 'RENT (P)',
    formula: 'A * 6.5%'
  }

  public readonly disabilityEmployeeTaxElement: TaxElement = {
    id: TaxElementId.DisabilityEmployee,
    name: 'RENT (U)',
    formula: 'A * 1.5%'
  }

  public readonly sicknessTaxElement: TaxElement = {
    id: TaxElementId.Sickness,
    name: 'CHOR',
    title: 'Оплата больничного',
    description: `
      <p>Работодатель - 0%</br>Работник - 2,45%</p>
      <p>Фонд, из которого оплачивают больничный.</p>`
  }

  public readonly sicknessBaseTaxElement: TaxElement = {
    id: TaxElementId.SicknessBase,
    name: 'CHOR',
  }

  public readonly sicknessEmployerTaxElement: TaxElement = {
    id: TaxElementId.SicknessEmployer,
    name: 'CHOR (P)',
  }

  public readonly sicknessEmployeeTaxElement: TaxElement = {
    id: TaxElementId.SicknessEmployee,
    name: 'CHOR (U)',
  }

  public readonly accidentTaxElement: TaxElement = {
    id: TaxElementId.Accident,
    name: 'WYP',
  }

  public readonly accidentBaseTaxElement: TaxElement = {
    id: TaxElementId.AccidentBase,
    name: 'WYP',
  }

  public readonly accidentEmployerTaxElement: TaxElement = {
    id: TaxElementId.AccidentEmployer,
    name: 'WYP (P)',
  }

  public readonly accidentEmployeeTaxElement: TaxElement = {
    id: TaxElementId.AccidentEmployee,
    name: 'WYP (U)',
  }

  public readonly fpTaxElement: TaxElement = {
    id: TaxElementId.Fp,
    name: 'FP',
  }

  public readonly fpBaseTaxElement: TaxElement = {
    id: TaxElementId.FpBase,
    name: 'FP',
  }

  public readonly fpEmployerTaxElement: TaxElement = {
    id: TaxElementId.FpEmployer,
    name: 'FP (P)',
  }

  public readonly fpEmployeeTaxElement: TaxElement = {
    id: TaxElementId.FpEmployee,
    name: 'FP (U)',
  }

  public readonly fgspTaxElement: TaxElement = {
    id: TaxElementId.Fgsp,
    name: 'FGŚP',
  }

  public readonly fgspBaseTaxElement: TaxElement = {
    id: TaxElementId.FgspBase,
    name: 'FGŚP',
  }

  public readonly fgspEmployerTaxElement: TaxElement = {
    id: TaxElementId.FgspEmployer,
    name: 'FGŚP (P)',
  }

  public readonly fgspEmployeeTaxElement: TaxElement = {
    id: TaxElementId.FgspEmployee,
    name: 'FGŚP (U)',
  }

  public readonly fepTaxElement: TaxElement = {
    id: TaxElementId.Fep,
    name: 'FEP',
  }

  public readonly fepBaseTaxElement: TaxElement = {
    id: TaxElementId.FepBase,
    name: 'FEP',
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
    title: 'Сборы на социальное страхование'
  }

  public readonly socialContributionEmployerTaxElement: TaxElement = {
    id: TaxElementId.SocialContributionEmployer,
    formula: `[${TaxElementId.TotalGrossValue}] - ([${TaxElementId.RetirementEmployer}] + [${TaxElementId.DisabilityEmployer}] + [${TaxElementId.AccidentEmployer}] + [${TaxElementId.FpEmployer}] + [${TaxElementId.FgspEmployer}])`
  }

  public readonly socialContributionEmployeeTaxElement: TaxElement = {
    id: TaxElementId.SocialContributionEmployee,
    formula: `[${TaxElementId.TotalGrossValue}] - ([${TaxElementId.RetirementEmployee}] + [${TaxElementId.DisabilityEmployee}] + [${TaxElementId.SicknessEmployee}])`
  }

  public readonly ppkBasicContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContribution,
    name: 'PPK P',
    title: '',
    description: ''
  }

  public readonly ppkAdditionalContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContribution,
    name: 'PPK D',
    title: '',
    description: ''
  }

  public readonly healthInsuranceContributionBaseElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContributionBase,
    name: 'PODST. ZDROW.',
    title: '',
    description: ''
  }

  public readonly healthInsuranceContributionElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContribution,
    name: 'ZDROW.',
    title: '',
    description: ''
  }

  public readonly zaniechPodElement: TaxElement = {
    id: TaxElementId.ZaniechPod,
    name: 'ZANIECH. POD.',
    title: '',
    description: ''
  }

  public readonly incomeTaxElement: TaxElement = {
    id: TaxElementId.IncomeTax,
    name: 'ZAL. POD.',
    title: '',
    description: ''
  }

  public readonly deductibleExpensesElement: TaxElement = {
    id: TaxElementId.DeductibleExpenses,
    name: 'KOSZTY',
    title: '',
    description: ''
  }

  public readonly middleClassTaxReliefElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxRelief,
    name: 'ULGA PRAC.',
    title: '',
    description: ''
  }

  public readonly taxReliefElement: TaxElement = {
    id: TaxElementId.TaxRelief,
    name: 'ULGA POD.',
    title: '',
    description: ''
  }

  public readonly cumulativeTaxBaseElement: TaxElement = {
    id: TaxElementId.CumulativeTaxBase,
    name: 'Podstawa podatku:',
    title: '',
    description: 'Amount of taxable income (tax base) from January to the current month' +
      '<\/br>' +
      'When the income exceeds the threshold of 120 000 PLN, it is taxed at higher rate (32% instead of 17%)' +
      '<\/br>' +
      'The amount is cumulative SUMA of taxable items reduced by social contributions and by Koszty'
  }

  public readonly retirementDisabilityCumulativeBaseElement: TaxElement = {
    id: TaxElementId.RetirementDisabilityCumulativeBase,
    name: 'Podstawa składek emer.-rent.',
    title: '',
    description: 'Cumulative base for EMER. and RENT. contributions (cumulative base from January to the current month).' +
      '<\/br>' +
      'Contributions EMER. & RENT are stopped until the end of the year when the annual limit is reached (the limit is shown in upper right corner of the payslip, line “Podstawa składek emer.-rent”)' +
      '<\/br>' +
      'The annual limit of the base in 2022 are 177 660,00 PLN'
  }

  public readonly taxPercentageElement: TaxElement = {
    id: TaxElementId.TaxPercentage,
    name: 'Procent podatku',
    title: '',
    description: '17% or 32% tax (or 17% / 32% in the month when the threshold of 120 000 PLN is reached)'
  }

  private readonly _all: TaxElement[] = [
    this.totalGrossTaxElement,
    this.totalGrossValueTaxElement,
    this.pkupTaxElement,
    this.pkupReduceTaxElement,
    this.retirementTaxElement,
    this.retirementBaseTaxElement,
    this.retirementEmployerTaxElement,
    this.retirementEmployeeTaxElement,
    this.disabilityTaxElement,
    this.disabilityEmployerTaxElement,
    this.disabilityEmployeeTaxElement,
    this.sicknessTaxElement,
    this.sicknessEmployerTaxElement,
    this.sicknessEmployeeTaxElement,
    this.accidentTaxElement,
    this.accidentEmployerTaxElement,
    this.accidentEmployeeTaxElement,
    this.fpTaxElement,
    this.fpEmployerTaxElement,
    this.fpEmployeeTaxElement,
    this.fgspTaxElement,
    this.fgspEmployerTaxElement,
    this.fgspEmployeeTaxElement,
    this.fepTaxElement,
    this.fepEmployerTaxElement,
    this.fepEmployeeTaxElement,
    this.socialContributionTaxElement,
    this.socialContributionEmployerTaxElement,
    this.socialContributionEmployeeTaxElement,
    this.ppkBasicContributionTaxElement,
    this.ppkAdditionalContributionTaxElement,
    this.healthInsuranceContributionBaseElement,
    this.healthInsuranceContributionElement,
    this.zaniechPodElement,
    this.incomeTaxElement,
    this.deductibleExpensesElement,
    this.middleClassTaxReliefElement,
    this.taxReliefElement,
    this.cumulativeTaxBaseElement,
    this.retirementDisabilityCumulativeBaseElement,
    this.taxPercentageElement,
  ];

  private readonly _map: Map<TaxElementId, TaxElement> = new Map(this._all.map(_ => ([_.id, _])));

  public getById(id: TaxElementId): TaxElement {
    return this._map.get(id)!;
  }
}
