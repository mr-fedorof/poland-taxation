import { Injectable } from '@angular/core';
import { TaxAdditiveElement } from '../models/tax-additive-element.model';
import { TaxElementId } from '../models/tax-element-id.model';

@Injectable({
  providedIn: 'root'
})
export class TaxAdditiveElementsCollection {
  public readonly baseSalaryTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.BaseSalaryTaxAdditive,
    name: 'wynagr.zasad./m',
    taxable: true,
    hint: 'Зарплата с вычетами нерабочих дней',
  };

  public readonly bonusTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.BonusTaxAdditive,
    name: 'Bonus',
    taxable: true,
    hint: 'Бонус',
  };

  public readonly pkupTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PkupTaxAdditive,
    name: 'Honorarium_PKUP',
    taxable: true,
    taxableValueId: TaxElementId.PkupValueTaxAdditive,
    hint: 'PKUP',
    system: true,
  }

  public readonly pkupValueTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PkupValueTaxAdditive,
    name: 'Honorarium_PKUP',
    taxable: true,
    system: true,
  }

  public readonly pkupReduceTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PkupReduceTaxAdditive,
    name: 'Honorarium_pomniejszenie',
    taxable: true,
    taxableValueId: TaxElementId.PkupReduceValueTaxAdditive,
    hint: 'PKUP не облагается налогом, поэтому его вычитают',
    system: true,
  }

  public readonly pkupReduceValueTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PkupReduceValueTaxAdditive,
    name: 'Honorarium_pomniejszenie',
    taxable: true,
    system: true,
  }

  public readonly ppkIncomeTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PpkIncomeTaxAdditive,
    name: 'Przychód z tytułu PPK/E',
    taxable: true,
    taxableValueId: TaxElementId.PpkIncomeValueTaxAdditive,
    system: true,
    hint: 'Доход от PPK',
  };

  public readonly ppkIncomeValueTaxAdditive: TaxAdditiveElement = {
    id: TaxElementId.PpkIncomeValueTaxAdditive,
    name: 'Przychód z tytułu PPK/E',
    taxable: true,
    system: true,
    formula: `[${TaxElementId.PpkBasicContributionEmployer}] + [${TaxElementId.PpkAdditionalContributionEmployer}]`
  };

  // public readonly sickPayTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickPayTaxAdditive,
  //   title: 'wynagr.chorobowe',
  //   name: 'wynagr.chorobowe',
  //   description: 'SICK PAY paid based on the certificate issued by the doctor (for calendar days)',
  //   taxable: true
  // };
  //
  // public readonly sickAllowance1TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickAllowance1TaxAdditive,
  //   title: 'zasiłek chorobowy',
  //   name: 'zasiłek chorobowy',
  //   description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
  //   taxable: true
  // };
  //
  // public readonly sickAllowance2TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickAllowance2TaxAdditive,
  //   title: 'zas.opiekuńczy',
  //   name: 'zas.opiekuńczy',
  //   description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
  //   taxable: true
  // };
  //
  // public readonly sickAllowance3TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickAllowance3TaxAdditive,
  //   title: 'zas.macierzyński',
  //   name: 'zas.macierzyński',
  //   description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
  //   taxable: true
  // };
  //
  // public readonly sickAllowance4TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickAllowance4TaxAdditive,
  //   title: 'zas.macierzyński (rodz.)',
  //   name: 'zas.macierzyński (rodz.)',
  //   description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
  //   taxable: true
  // };
  //
  // public readonly sickAllowance5TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SickAllowance5TaxAdditive,
  //   title: 'zas.macierzyński (ojcow.)',
  //   name: 'zas.macierzyński (ojcow.)',
  //   description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
  //   taxable: true
  // };
  //
  // public readonly myBenefitTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.MyBenefitTaxAdditive,
  //   title: 'Pakiet (MyBenefit package)',
  //   name: 'Pakiet (MyBenefit package)',
  //   description: '“Benefits in kind” - items that are not paid in cash* but appear on payslip because they are subject to tax and social security contributions',
  //   taxable: true
  // };
  //
  // public readonly relocationBenefitTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.RelocationBenefitTaxAdditive,
  //   title: 'Pakiet relokacyjny (Relocation_benefits)',
  //   name: 'Pakiet relokacyjny (Relocation_benefits)',
  //   description: '(*Relocation Benefits are not paid in salary but as an expense)',
  //   taxable: true
  // };
  //
  // public readonly languageCourseTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.LanguageCourseTaxAdditive,
  //   title: 'Kurs językowy (Polish for family)',
  //   name: 'Kurs językowy (Polish for family)',
  //   description: '',
  //   taxable: true
  // };
  //
  // public readonly quoterBonusTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.QuoterBonusTaxAdditive,
  //   title: 'Premia kwartalna',
  //   name: 'Premia kwartalna',
  //   description: 'Bonuses',
  //   taxable: true
  // };
  //
  // public readonly annualBonusTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.AnnualBonusTaxAdditive,
  //   title: 'Annual bonus',
  //   name: 'Annual bonus',
  //   description: 'Bonuses',
  //   taxable: true
  // };
  //
  // public readonly supplementalPayBonusTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.SupplementalPayBonusTaxAdditive,
  //   title: 'Supplemental Pay',
  //   name: 'Supplemental Pay',
  //   description: 'Bonuses',
  //   taxable: true
  // };
  //
  // public readonly researcherBonusTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.ResearcherBonusTaxAdditive,
  //   title: 'Researcher bonus',
  //   name: 'Researcher bonus',
  //   description: 'Bonuses',
  //   taxable: true
  // };
  //
  // public readonly overtimeTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.OvertimeTaxAdditive,
  //   title: 'powyżej normy',
  //   name: 'powyżej normy',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly overtime50TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.Overtime50TaxAdditive,
  //   title: 'n.godz. 50%',
  //   name: 'n.godz. 50%',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly overtime100TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.Overtime100TaxAdditive,
  //   title: 'n.godz. 100%',
  //   name: 'n.godz. 100%',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly otherOvertimeTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.OtherOvertimeTaxAdditive,
  //   title: 'Wynagr. za nadgodziny',
  //   name: 'Wynagr. za nadgodziny',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly otherOvertime50TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.OtherOvertime50TaxAdditive,
  //   title: 'Dod. za nadgodziny 50%',
  //   name: 'Dod. za nadgodziny 50%',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly otherOvertime100TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.OtherOvertime100TaxAdditive,
  //   title: 'Dod. za nadgodziny 100%',
  //   name: 'Dod. za nadgodziny 100%',
  //   description: 'Payment for overtime',
  //   taxable: true
  // };
  //
  // public readonly addon1TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.Addon1TaxAdditive,
  //   title: 'dod.noc.',
  //   name: 'dod.noc.',
  //   description: 'Add-on for an overtime at night',
  //   taxable: true
  // };
  //
  // public readonly addon2TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.Addon2TaxAdditive,
  //   title: 'Dod. godziny nocne (Night add-on)',
  //   name: 'Dod. godziny nocne (Night add-on)',
  //   description: 'Add-on for an overtime at night',
  //   taxable: true
  // };
  //
  // public readonly addon3TaxAdditive: TaxAdditive = {
  //   id: TaxElementId.Addon3TaxAdditive,
  //   title: 'wynagr.url.',
  //   name: 'wynagr.url.',
  //   description: 'Add-on for regular vacation – paid only in case you had overtime / night allowance / Researcher bonus paid in 3 months preceding the vacations',
  //   taxable: true
  // };
  //
  // public readonly vacationCompensationTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.VacationCompensationTaxAdditive,
  //   title: 'Ekwiwalent za niewykorzystany urlop',
  //   name: 'Ekwiwalent za niewykorzystany urlop',
  //   description: 'Compensation for unused vacations – paid for unused vacation days only in the case of leaving the company',
  //   taxable: true
  // };
  //
  // public readonly bailiffDeductionTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.BailiffDeductionTaxAdditive,
  //   title: 'Zajęcie komornicze (Bailiff deduction)',
  //   name: 'Zajęcie komornicze (Bailiff deduction)',
  //   description: 'Seizure by a bailiff - forced deductions made based on official notification from the bailiff, performance titles',
  //   taxable: false
  // };
  //
  // public readonly myBenefitDeductionTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.MyBenefitDeductionTaxAdditive,
  //   title: 'Pakiet potrącenie (MyBenefit deduction)',
  //   name: 'Pakiet potrącenie (MyBenefit deduction)',
  //   description: 'Deductions related to use of MyBenefit recurring benefits (Luxmed / Medicover/PZU/Multisport only, if the limit exceeds the budget (404 PLN /month)',
  //   taxable: false
  // };
  //
  // public readonly cashAdvanceDeductionTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.CashAdvanceDeductionTaxAdditive,
  //   title: 'Rozliczenie zaliczki (Cash advance ded.)',
  //   name: 'Rozliczenie zaliczki (Cash advance ded.)',
  //   description: 'Cash advance deduction',
  //   taxable: false
  // };
  //
  // public readonly esppTaxAdditive: TaxAdditive = {
  //   id: TaxElementId.EsppTaxAdditive,
  //   title: 'ESPP',
  //   name: 'ESPP',
  //   description: 'Employee Stock Purchase Plan deduction',
  //   taxable: false
  // };

  private readonly _all: TaxAdditiveElement[] = Object.values(this)
    .filter(_ => !!_.id && !!TaxElementId[_.id as TaxElementId]);
  private readonly _mapById: Map<TaxElementId, TaxAdditiveElement> = new Map(this._all.map(_ => ([_.id, _])));
  private readonly _mapByName: Map<string, TaxAdditiveElement> = new Map(this._all.map(_ => ([_.name, _])));

  public getAll(includeSystem: boolean = false): TaxAdditiveElement[] {
    return [...this._all].filter(_ => !_.system || includeSystem);
  }

  public getById(id: TaxElementId): TaxAdditiveElement | null {
    return this._mapById.get(id) ?? null;
  }

  public getByName(name: string): TaxAdditiveElement {
    return this._mapByName.get(name)!;
  }
}
