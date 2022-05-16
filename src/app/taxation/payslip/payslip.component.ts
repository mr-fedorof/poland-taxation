import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { startWith } from 'rxjs';
import { MONTHS } from '../../../modules/date';
import { TaxAdditive, Taxation, TaxationService } from '../services/taxation.service';
import { TaxAdditiveComponent } from './tax-additive/tax-additive.component';

export interface TaxElement {
  name: string;
  description?: string[];
}

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  public readonly months: string[] = MONTHS;
  public readonly currentDate: Date = new Date();

  public customizationForm!: FormGroup;
  public taxation!: Taxation;

  public taxAdditives: TaxAdditive[] = [
    {
      name: 'wynagr.zasad./m',
      description: 'BASE SALARY specified in the employment contract reduced by any absence.',
      taxable: true
    },

    {
      name: 'wynagr.chorobowe',
      description: 'SICK PAY paid based on the certificate issued by the doctor (for calendar days)',
      taxable: true
    },

    {
      name: 'zasiłek chorobowy',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      name: 'zas.opiekuńczy',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      name: 'zas.macierzyński',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      name: 'zas.macierzyński (rodz.)',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },
    {
      name: 'zas.macierzyński (ojcow.)',
      description: 'SICK ALLOWANCE for sickness, childcare / family care, maternity, parental leave, paternity',
      taxable: true
    },

    {
      name: 'Pakiet (MyBenefit package)',
      description: '“Benefits in kind” - items that are not paid in cash* but appear on payslip because they are subject to tax and social security contributions',
      taxable: true
    },
    {
      name: 'Pakiet relokacyjny (Relocation_benefits)',
      description: '(*Relocation Benefits are not paid in salary but as an expense)',
      taxable: true
    },
    {
      name: 'Kurs językowy (Polish for family)',
      description: '',
      taxable: true
    },

    {
      name: 'Bonus',
      description: 'Bonuses',
      taxable: true
    },
    {
      name: 'Premia kwartalna',
      description: 'Bonuses',
      taxable: true
    },
    {
      name: 'Annual bonus',
      description: 'Bonuses',
      taxable: true
    },
    {
      name: 'Supplemental Pay',
      description: 'Bonuses',
      taxable: true
    },
    {
      name: 'Researcher bonus',
      description: 'Bonuses',
      taxable: true
    },

    {
      name: 'powyżej normy',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      name: 'n.godz. 50%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      name: 'n.godz. 100%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      name: 'Wynagr. za nadgodziny',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      name: 'Dod. za nadgodziny 50%',
      description: 'Payment for overtime',
      taxable: true
    },
    {
      name: 'Dod. za nadgodziny 100%',
      description: 'Payment for overtime',
      taxable: true
    },

    {
      name: 'dod.noc.',
      description: 'Add-on for an overtime at night',
      taxable: true
    },
    {
      name: 'Dod. godziny nocne (Night add-on)',
      description: 'Add-on for an overtime at night',
      taxable: true
    },

    {
      name: 'wynagr.url.',
      description: 'Add-on for regular vacation – paid only in case you had overtime / night allowance / Researcher bonus paid in 3 months preceding the vacations',
      taxable: true
    },

    {
      name: 'Ekwiwalent za niewykorzystany urlop',
      description: 'Compensation for unused vacations – paid for unused vacation days only in the case of leaving the company',
      taxable: true
    },

    {
      name: 'Przychód z tytułu PPK/E',
      description: 'PPK income - employer share is subject to tax',
      taxable: true
    },

    {
      name: 'Zajęcie komornicze (Bailiff deduction)',
      description: 'Seizure by a bailiff - forced deductions made based on official notification from the bailiff, performance titles',
      taxable: false
    },
    {
      name: 'Pakiet potrącenie (MyBenefit deduction)',
      description: 'Deductions related to use of MyBenefit recurring benefits (Luxmed / Medicover/PZU/Multisport only, if the limit exceeds the budget (404 PLN /month)',
      taxable: false
    },
    {
      name: 'Rozliczenie zaliczki (Cash advance ded.)',
      description: 'Cash advance deduction',
      taxable: false
    },
    {
      name: 'ESPP',
      description: 'Employee Stock Purchase Plan deduction',
      taxable: false
    },
  ]

  public taxAdditivesMap: Map<string, TaxAdditive> = new Map(this.taxAdditives.map(_ => ([_.name, _])));

  public pkupTaxElement: TaxElement = {
    name: 'Honorarium_PKUP'
  }

  public pkupReduceTaxElement: TaxElement = {
    name: 'Honorarium_pomniejszenie'
  }

  public retirementTaxElement: TaxElement = {
    name: 'EMER'
  }

  public disabilityTaxElement: TaxElement = {
    name: 'RENT'
  }

  public sicknessTaxElement: TaxElement = {
    name: 'CHOR'
  }

  public accidentTaxElement: TaxElement = {
    name: 'WYP'
  }

  public fpTaxElement: TaxElement = {
    name: 'FP'
  }

  public fgspTaxElement: TaxElement = {
    name: 'FGŚP'
  }

  public fepTaxElement: TaxElement = {
    name: 'FEP'
  }

  public socialContributionTaxElement: TaxElement = {
    name: 'RAZEM SKŁ. ZUS'
  }

  public ppkBasicContributionTaxElement: TaxElement = {
    name: 'PPK P'
  }

  public ppkAdditionalContributionTaxElement: TaxElement = {
    name: 'PPK D'
  }

  public healthInsuranceContributionBaseElement: TaxElement = {
    name: 'PODST. ZDROW.'
  }

  public healthInsuranceContributionElement: TaxElement = {
    name: 'ZDROW.'
  }

  public zaniechPodElement: TaxElement = {
    name: 'ZANIECH. POD.'
  }

  public incomeTaxElement: TaxElement = {
    name: 'ZAL. POD.'
  }

  public deductibleExpensesElement: TaxElement = {
    name: 'KOSZTY'
  }

  public middleClassTaxReliefElement: TaxElement = {
    name: 'ULGA PRAC.'
  }

  public taxReliefElement: TaxElement = {
    name: 'ULGA POD.'
  }

  public cumulativeTaxBaseElement: TaxElement = {
    name: 'Podstawa podatku:',
    description: [
      'Amount of taxable income (tax base) from January to the current month',
      'When the income exceeds the threshold of 120 000 PLN, it is taxed at higher rate (32% instead of 17%)',
      'The amount is cumulative SUMA of taxable items reduced by social contributions and by Koszty'
    ]
  }

  public retirementDisabilityCumulativeBaseElement: TaxElement = {
    name: 'Podstawa składek emer.-rent.',
    description: [
      'Cumulative base for EMER. and RENT. contributions (cumulative base from January to the current month).',
      'Contributions EMER. & RENT are stopped until the end of the year when the annual limit is reached (the limit is shown in upper right corner of the payslip, line “Podstawa składek emer.-rent”)',
      'The annual limit of the base in 2022 are 177 660,00 PLN'
    ]
  }

  public taxPercentageElement: TaxElement = {
    name: 'Procent podatku',
    description: [
      '17% or 32% tax (or 17% / 32% in the month when the threshold of 120 000 PLN is reached)'
    ]
  }

  constructor(
    private readonly taxationService: TaxationService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.customizationForm = this.formBuilder.group({
      fullName: this.formBuilder.control('John Wick'),
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
