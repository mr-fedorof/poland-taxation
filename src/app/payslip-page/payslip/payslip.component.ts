import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { startWith } from 'rxjs';
import { MONTHS } from '../../../modules/date';
import { TaxAdditiveValue, Taxation, TaxationService } from '../../taxation/taxation.service';
import { TaxAdditive } from './models/tax-additive.model';
import { TaxElementId } from './models/tax-element-id.model';
import { TaxElement } from './models/tax-element.model';
import { TaxElementRegistryService } from './services/tax-element-registry.service';
import { TaxAdditiveComponent } from './tax-additive/tax-additive.component';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss'],
  providers: [
    TaxElementRegistryService
  ]
})
export class PayslipComponent implements OnInit {
  public readonly months: string[] = MONTHS;
  public readonly currentDate: Date = new Date();

  public customizationForm!: FormGroup;

  public get selectedTaxAdditives(): TaxAdditiveValue[] {
    return this.customizationForm.controls['taxAdditives'].value;
  }

  public taxation!: Taxation;

  public taxAdditives: TaxAdditive[] = [
    {
      id: TaxElementId.BaseSalaryTaxAdditive,
      title: 'wynagr.zasad./m',
      name: 'wynagr.zasad./m',
      description: 'BASE SALARY specified in the employment contract reduced by any absence.',
      taxable: true
    },

    {
      id: TaxElementId.SickPayTaxAdditive,
      title: 'wynagr.chorobowe',
      name: 'wynagr.chorobowe',
      description: 'SICK PAY paid based on the certificate issued by the doctor (for calendar days)',
      taxable: true
    },

    {
      id: TaxElementId.SickAllowance1TaxAdditive,
      title: 'zasiłek chorobowy',
      name: 'zasiłek chorobowy',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      id: TaxElementId.SickAllowance2TaxAdditive,
      title: 'zas.opiekuńczy',
      name: 'zas.opiekuńczy',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      id: TaxElementId.SickAllowance3TaxAdditive,
      title: 'zas.macierzyński',
      name: 'zas.macierzyński',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      id: TaxElementId.SickAllowance4TaxAdditive,
      title: 'zas.macierzyński (rodz.)',
      name: 'zas.macierzyński (rodz.)',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      id: TaxElementId.SickAllowance5TaxAdditive,
      title: 'zas.macierzyński (ojcow.)',
      name: 'zas.macierzyński (ojcow.)',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },

    {
      id: TaxElementId.MyBenefitTaxAdditive,
      title: 'Pakiet (MyBenefit package)',
      name: 'Pakiet (MyBenefit package)',
      description: '“Benefits in kind” - items that are not paid in cash* but appear on payslip because they are subject to tax and social security contributions',
      taxable: true
    },
    {
      id: TaxElementId.RelocationBenefitTaxAdditive,
      title: 'Pakiet relokacyjny (Relocation_benefits)',
      name: 'Pakiet relokacyjny (Relocation_benefits)',
      description: '(*Relocation Benefits are not paid in salary but as an expense)',
      taxable: true
    },
    {
      id: TaxElementId.LanguageCourseTaxAdditive,
      title: 'Kurs językowy (Polish for family)',
      name: 'Kurs językowy (Polish for family)',
      description: '',
      taxable: true
    },

    {
      id: TaxElementId.BonusTaxAdditive,
      title: 'Bonus',
      name: 'Bonus',
      description: 'Bonuses',
      taxable: true
    },
    {
      id: TaxElementId.QuoterBonusTaxAdditive,
      title: 'Premia kwartalna',
      name: 'Premia kwartalna',
      description: 'Bonuses',
      taxable: true
    },
    {
      id: TaxElementId.AnnualBonusTaxAdditive,
      title: 'Annual bonus',
      name: 'Annual bonus',
      description: 'Bonuses',
      taxable: true
    },
    {
      id: TaxElementId.SupplementalPayBonusTaxAdditive,
      title: 'Supplemental Pay',
      name: 'Supplemental Pay',
      description: 'Bonuses',
      taxable: true
    },
    {
      id: TaxElementId.ResearcherBonusTaxAdditive,
      title: 'Researcher bonus',
      name: 'Researcher bonus',
      description: 'Bonuses',
      taxable: true
    },

    {
      id: TaxElementId.OvertimeTaxAdditive,
      title: 'powyżej normy',
      name: 'powyżej normy',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      id: TaxElementId.Overtime50TaxAdditive,
      title: 'n.godz. 50%',
      name: 'n.godz. 50%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      id: TaxElementId.Overtime100TaxAdditive,
      title: 'n.godz. 100%',
      name: 'n.godz. 100%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      id: TaxElementId.OtherOvertimeTaxAdditive,
      title: 'Wynagr. za nadgodziny',
      name: 'Wynagr. za nadgodziny',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      id: TaxElementId.OtherOvertime50TaxAdditive,
      title: 'Dod. za nadgodziny 50%',
      name: 'Dod. za nadgodziny 50%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      id: TaxElementId.OtherOvertime100TaxAdditive,
      title: 'Dod. za nadgodziny 100%',
      name: 'Dod. za nadgodziny 100%',
      description: 'Payment for overtime',
      taxable: true
    },

    {
      id: TaxElementId.Addon1TaxAdditive,
      title: 'dod.noc.',
      name: 'dod.noc.',
      description: 'Add-on for an overtime at night',
      taxable: true
    },
    {
      id: TaxElementId.Addon2TaxAdditive,
      title: 'Dod. godziny nocne (Night add-on)',
      name: 'Dod. godziny nocne (Night add-on)',
      description: 'Add-on for an overtime at night',
      taxable: true
    },

    {
      id: TaxElementId.Addon3TaxAdditive,
      title: 'wynagr.url.',
      name: 'wynagr.url.',
      description: 'Add-on for regular vacation – paid only in case you had overtime / night allowance / Researcher bonus paid in 3 months preceding the vacations',
      taxable: true
    },

    {
      id: TaxElementId.VacationCompensationTaxAdditive,
      title: 'Ekwiwalent za niewykorzystany urlop',
      name: 'Ekwiwalent za niewykorzystany urlop',
      description: 'Compensation for unused vacations – paid for unused vacation days only in the case of leaving the company',
      taxable: true
    },

    {
      id: TaxElementId.PpkIncomeTaxAdditive,
      title: 'Przychód z tytułu PPK/E',
      name: 'Przychód z tytułu PPK/E',
      description: 'PPK income - employer share is subject to tax',
      taxable: true
    },

    {
      id: TaxElementId.BailiffDeductionTaxAdditive,
      title: 'Zajęcie komornicze (Bailiff deduction)',
      name: 'Zajęcie komornicze (Bailiff deduction)',
      description: 'Seizure by a bailiff - forced deductions made based on official notification from the bailiff, performance titles',
      taxable: false
    },
    {
      id: TaxElementId.MyBenefitDeductionTaxAdditive,
      title: 'Pakiet potrącenie (MyBenefit deduction)',
      name: 'Pakiet potrącenie (MyBenefit deduction)',
      description: 'Deductions related to use of MyBenefit recurring benefits (Luxmed / Medicover/PZU/Multisport only, if the limit exceeds the budget (404 PLN /month)',
      taxable: false
    },
    {
      id: TaxElementId.CashAdvanceDeductionTaxAdditive,
      title: 'Rozliczenie zaliczki (Cash advance ded.)',
      name: 'Rozliczenie zaliczki (Cash advance ded.)',
      description: 'Cash advance deduction',
      taxable: false
    },
    {
      id: TaxElementId.EsppTaxAdditive,
      title: 'ESPP',
      name: 'ESPP',
      description: 'Employee Stock Purchase Plan deduction',
      taxable: false
    },
  ]

  public taxAdditivesMap: Map<string, TaxAdditive> = new Map(this.taxAdditives.map(_ => ([_.name, _])));

  public pkupTaxElement: TaxElement = {
    id: TaxElementId.Pkup,
    name: 'Honorarium_PKUP',
    title: '',
    description: ''
  }

  public pkupReduceTaxElement: TaxElement = {
    id: TaxElementId.PkupReduce,
    name: 'Honorarium_pomniejszenie',
    title: '',
    description: ''
  }

  public retirementTaxElement: TaxElement = {
    id: TaxElementId.Retirement,
    name: 'EMER',
    title: 'Пенсионное обеспечение',
    description: `
      <p>Взнос в пенсионный фонд.</p>
      <p>Работник - 9,76%</p>
      <p>Работодатель - 9,76%</p>
    `
  }

  public disabilityTaxElement: TaxElement = {
    id: TaxElementId.Disability,
    name: 'RENT',
    title: 'Обеспечение по инвалидности',
    description: `
      <p>Работодатель - 6,5%</br>Работник - 1,5%</p>
      <p>Страхование на случай потери работоспособности – получение инвалидности, которая не позволит далее исполнять свои функции в полном объеме. Фонд, из которого будет формироваться пособие по инвалидностиs.</p>
    `
  }

  public sicknessTaxElement: TaxElement = {
    id: TaxElementId.Sickness,
    name: 'CHOR',
    title: 'Оплата больничного',
    description: `
      <p>Работодатель - 0%</br>Работник - 2,45%</p>
      <p>Фонд, из которого оплачивают больничный.</p>`
  }

  public accidentTaxElement: TaxElement = {
    id: TaxElementId.Accident,
    name: 'WYP',
    title: '',
    description: ''
  }

  public fpTaxElement: TaxElement = {
    id: TaxElementId.Fp,
    name: 'FP',
    title: '',
    description: ''
  }

  public fgspTaxElement: TaxElement = {
    id: TaxElementId.Fgsp,
    name: 'FGŚP',
    title: '',
    description: ''
  }

  public fepTaxElement: TaxElement = {
    id: TaxElementId.Fep,
    name: 'FEP',
    title: '',
    description: ''
  }

  public socialContributionTaxElement: TaxElement = {
    id: TaxElementId.SocialContribution,
    name: 'RAZEM SKŁ. ZUS',
    title: '',
    description: '',
    formula: ''
  }

  public ppkBasicContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkBasicContribution,
    name: 'PPK P',
    title: '',
    description: ''
  }

  public ppkAdditionalContributionTaxElement: TaxElement = {
    id: TaxElementId.PpkAdditionalContribution,
    name: 'PPK D',
    title: '',
    description: ''
  }

  public healthInsuranceContributionBaseElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContributionBase,
    name: 'PODST. ZDROW.',
    title: '',
    description: ''
  }

  public healthInsuranceContributionElement: TaxElement = {
    id: TaxElementId.HealthInsuranceContribution,
    name: 'ZDROW.',
    title: '',
    description: ''
  }

  public zaniechPodElement: TaxElement = {
    id: TaxElementId.ZaniechPod,
    name: 'ZANIECH. POD.',
    title: '',
    description: ''
  }

  public incomeTaxElement: TaxElement = {
    id: TaxElementId.IncomeTax,
    name: 'ZAL. POD.',
    title: '',
    description: ''
  }

  public deductibleExpensesElement: TaxElement = {
    id: TaxElementId.DeductibleExpenses,
    name: 'KOSZTY',
    title: '',
    description: ''
  }

  public middleClassTaxReliefElement: TaxElement = {
    id: TaxElementId.MiddleClassTaxRelief,
    name: 'ULGA PRAC.',
    title: '',
    description: ''
  }

  public taxReliefElement: TaxElement = {
    id: TaxElementId.TaxRelief,
    name: 'ULGA POD.',
    title: '',
    description: ''
  }

  public cumulativeTaxBaseElement: TaxElement = {
    id: TaxElementId.CumulativeTaxBase,
    name: 'Podstawa podatku:',
    title: '',
    description: 'Amount of taxable income (tax base) from January to the current month' +
      '<\/br>' +
      'When the income exceeds the threshold of 120 000 PLN, it is taxed at higher rate (32% instead of 17%)' +
      '<\/br>' +
      'The amount is cumulative SUMA of taxable items reduced by social contributions and by Koszty'
  }

  public retirementDisabilityCumulativeBaseElement: TaxElement = {
    id: TaxElementId.RetirementDisabilityCumulativeBase,
    name: 'Podstawa składek emer.-rent.',
    title: '',
    description: 'Cumulative base for EMER. and RENT. contributions (cumulative base from January to the current month).' +
      '<\/br>' +
      'Contributions EMER. & RENT are stopped until the end of the year when the annual limit is reached (the limit is shown in upper right corner of the payslip, line “Podstawa składek emer.-rent”)' +
      '<\/br>' +
      'The annual limit of the base in 2022 are 177 660,00 PLN'
  }

  public taxPercentageElement: TaxElement = {
    id: TaxElementId.TaxPercentage,
    name: 'Procent podatku',
    title: '',
    description: '17% or 32% tax (or 17% / 32% in the month when the threshold of 120 000 PLN is reached)'
  }

  constructor(
    private readonly taxationService: TaxationService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.customizationForm = this.formBuilder.group({
      month: this.formBuilder.control(0),
      pkup: this.formBuilder.control(0),
      liveOutside: this.formBuilder.control(false),
      ppkEnabled: this.formBuilder.control(false),
      pit2Enabled: this.formBuilder.control(true),
      taxAdditives: this.formBuilder.array([]),
    });

    this.customizationForm.valueChanges
      .pipe(startWith(this.customizationForm.value))
      .subscribe(value => {
        this.taxation = this.taxationService.calculate({
          taxAdditives: value.taxAdditives,
          pkup: +value.pkup,
          ppkEnabled: value.ppkEnabled,
          liveOutside: value.liveOutside,
          pit2Enabled: value.pit2Enabled
        });
      });

    this.addTaxAdditive(this.taxAdditivesMap.get('wynagr.zasad./m')!, 11550);
    this.addTaxAdditive(this.taxAdditivesMap.get('Bonus')!, 6833.28);
    this.customizationForm.controls['pkup'].setValue(3501);
  }

  public onAddTaxAdditive(): void {
    const dialogRef: MatDialogRef<TaxAdditiveComponent> = this.dialog.open(TaxAdditiveComponent, {
      width: '400px',
      data: {
        taxAdditives: this.taxAdditives,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTaxAdditive(result.taxAdditive, result.value);
      }
    });
  }

  public sumTaxAdditives(taxAdditives: TaxAdditiveValue[], taxable: boolean): number {
    return taxAdditives.filter(_ => _.taxable === taxable).reduce((p, c) => p + c.value, 0);
  }

  private addTaxAdditive(taxAdditive: TaxAdditive, value: number): void {
    const additivesFormGroup: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;

    additivesFormGroup.push(this.formBuilder.control({
      name: taxAdditive.name,
      taxable: taxAdditive.taxable,
      value: +value
    }));
  }

  private removeTaxAdditive(index: number): void {
    const additivesFormGroup: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;

    additivesFormGroup.removeAt(index);
  }
}