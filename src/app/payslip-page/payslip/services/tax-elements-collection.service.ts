import { Injectable } from '@angular/core';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';
import { TaxAdditiveElementsCollection } from './tax-additive-elements-collection.service';

@Injectable({
  providedIn: 'root'
})
export class TaxElementsCollection {
  private readonly _all: TaxElement[];
  private readonly _map: Map<TaxElementId, TaxElement>;

  constructor(private readonly taxAdditiveElementsCollection: TaxAdditiveElementsCollection) {
    this._all = Object.values(this)
      .filter(_ => !!_.id && !!TaxElementId[_.id as TaxElementId])
      .concat(...taxAdditiveElementsCollection.getAll(true));
    this._map = new Map(this._all.map(_ => ([_.id, _])));
  }

  public readonly withTaxTaxElement: TaxElement = {
    id: TaxElementId.WithTax,
    name: 'OPODATKOWANE',
    hint: 'Облагаемое налогом',
  }

  public readonly withoutTaxTaxElement: TaxElement = {
    id: TaxElementId.WithoutTax,
    name: 'NIEOPODATKOWANE',
    hint: 'Не облагаемое налогом',
  }

  public readonly taxAdditiveNameTaxElement: TaxElement = {
    id: TaxElementId.TaxAdditiveName,
    name: 'NAZWA ELEMENTU',
    hint: 'Название элемента',
  }

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
    formula: `Round( ( [${TaxElementId.TotalGrossValue}] - [${TaxElementId.SocialContributionEmployee}] - [${TaxElementId.DeductibleExpensesValue}] - [${TaxElementId.MiddleClassTaxReliefValue}] ) * [${TaxElementId.TaxPercentageValue}] - [${TaxElementId.TaxReliefValue}])`
  }

  public readonly deductibleExpensesElement: TaxElement = {
    id: TaxElementId.DeductibleExpenses,
    name: 'KOSZTY',
    hint: 'Расходы работника (понижение налога)',
  }

  public readonly deductibleExpensesValueElement: TaxElement = {
    id: TaxElementId.DeductibleExpensesValue,
    name: 'KOSZTY',
    formula: `( [${TaxElementId.PkupValueTaxAdditive}] – ([${TaxElementId.PkupValueTaxAdditive}] * 13.71% [ social contribution ] ) ) * 50% + 250 [ if live inside ] + 300 [ if live outside ]`
  }

  public readonly middleClassTaxReliefElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxRelief,
    name: 'ULGA PRAC.',
    hint: 'Помощь среднему классу',
    description: `
      <p>Сумма “Помощи среднему классу” зависит от месячного гросс дохода:</p>
      <p>5 701 - 8 549 PLN => (Income * 6.68% – 380.50 PLN) ÷ 17%</p>
      <p>8 549 – 11 141 PLN => (Income * (-7.35%) + 819.08 PLN) ÷ 17%</p>
      <p>Sick leave allowances вычитаются из “middle class relief”</p>
    `
  }

  public readonly middleClassTaxReliefValueElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxReliefValue,
    name: 'ULGA PRAC.',
    formula: `
      IF [${TaxElementId.TotalGrossValue}] IN [5701.00, 8549] => ([${TaxElementId.TotalGrossValue}] * 6.68% – 380.50) / 17%</br>
      IF [${TaxElementId.TotalGrossValue}] IN (8 549, 11141] => ([${TaxElementId.TotalGrossValue}] * (-7.35%) + 819.08) / 17%
    `
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
    name: 'Podstawa podatku',
    title: 'Накопленный налогооблагаемый доход',
    description: `
      <p>Сумма налогооблагаемого дохода с января по текущий месяц, от которой зависит подоходный налог:</p>
      <p>от 0 до 30 000 - 0%</p>
      <p>от 30 000 до 120 000 - 17%</p>
      <p>от 120 000 - 32%</p>
    `,
    hint: 'Сумма налогооблагаемого дохода с января по текущий месяц',
  }

  public readonly cumulativeTaxBaseValueElement: TaxElement = {
    id: TaxElementId.CumulativeTaxBaseValue,
    name: 'Podstawa podatku',
    formula: `SUM FOR THE PREVIOUS MONTHS + ([${TaxElementId.TotalGrossValue}] - [${TaxElementId.SocialContributionEmployee}] - [${TaxElementId.DeductibleExpensesValue}] - [${TaxElementId.MiddleClassTaxReliefValue}])`
  }

  public readonly retirementDisabilityCumulativeBaseElement: TaxElement = {
    id: TaxElementId.RetirementDisabilityCumulativeBase,
    name: 'Podstawa składek emer.-rent.',
    title: 'Накопительная база для пенсионного фонда (EMER) и обеспечение по инвалидности (RENT)',
    description: `
      <p>Вклад в пенсионный фонд (EMER) и обеспечение по инвалидности (RENT) прекратится по достижении лимита.</p>
      <p>Лимит устанавливается государством и для 2022го года равен 177660.00 PLN</p>
    `,
  }

  public readonly retirementDisabilityCumulativeBaseValueElement: TaxElement = {
    id: TaxElementId.RetirementDisabilityCumulativeBaseValue,
    name: 'Podstawa składek emer.-rent.',
    formula: `SUM FOR THE PREVIOUS MONTHS + [${TaxElementId.Base}]`
  }

  public readonly taxPercentageElement: TaxElement = {
    id: TaxElementId.TaxPercentage,
    name: 'Procent podatku',
    hint: 'Процент подоходного налога'
  }

  public readonly taxPercentageValueElement: TaxElement = {
    id: TaxElementId.TaxPercentageValue,
    name: 'Procent podatku',
    title: 'Процент подоходного налога',
    description: `
      <p>Процент зависит от накопленной суммы налогооблагаемого дохода с января по текущий месяц:</p>
      <p>от 0 до 30 000 - 0%</p>
      <p>от 30 000 до 120 000 - 17%</p>
      <p>от 120 000 - 32%</p>
    `
  }

  public getById(id: TaxElementId): TaxElement | null {
    return this._map.get(id) ?? null;
  }

  public getTaxableValueId(id: TaxElementId): TaxElement | null {
    const taxAdditiveElement = this.taxAdditiveElementsCollection.getById(id);
    if (!taxAdditiveElement) {
      return null;
    }

    if (!taxAdditiveElement.taxableValueId) {
      return null;
    }

    return this.getById(taxAdditiveElement.taxableValueId);
  }

  public getNonTaxableValueId(id: TaxElementId): TaxElement | null {
    const taxAdditiveElement = this.taxAdditiveElementsCollection.getById(id);
    if (!taxAdditiveElement) {
      return null;
    }

    if (!taxAdditiveElement.nonTaxableValueId) {
      return null;
    }

    return this.getById(taxAdditiveElement.nonTaxableValueId);
  }
}
