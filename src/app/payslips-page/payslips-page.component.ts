import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { combineLatestWith, ReplaySubject } from 'rxjs';
import { MONTHS } from '../../modules/date';
import { PayslipParameters } from './payslip/models/payslip-parameters.model';
import { TaxAdditiveElement } from './payslip/models/tax-additive-element.model';
import { TaxAdditiveElementsCollection } from './payslip/services/tax-additive-elements-collection.service';
import { PayslipsConfiguration } from './payslips-generator-dialog/payslips-configuration.model';
import { PayslipsGeneratorDialogComponent } from './payslips-generator-dialog/payslips-generator-dialog.component';
import { TaxAdditiveDialogComponent } from './tax-additive-dialog/tax-additive-dialog.component';
import {
  TaxParametersDialogComponent,
  TaxParametersDialogOptions
} from './tax-parameters-dialog/tax-parameters-dialog.component';
import { TaxParameters } from './tax-parameters/tax-parameters.model';
import { TaxAdditiveValue } from './taxation/tax-additive-value.model';
import { TaxElementId } from './taxation/tax-element-id.model';
import { Taxation } from './taxation/taxation.model';
import { TaxationService } from './taxation/taxation.service';

export interface Month {
  index: number;
  name: string;
  payslipParameters: PayslipParameters;
  taxParameters: TaxParameters;
  taxAdditiveValues: TaxAdditiveValue[];
  taxation: Taxation;
}

@Component({
  selector: 'app-payslips-page',
  templateUrl: './payslips-page.component.html',
  styleUrls: ['./payslips-page.component.scss']
})
export class PayslipsPageComponent implements OnInit {
  private readonly payslipsConfigurationSource: ReplaySubject<PayslipsConfiguration> = new ReplaySubject<PayslipsConfiguration>(1);

  private _months: Month[] = [];

  public payslipsTableColumns: string[] = [
    'name',
    'totalNet',
    'tax',
    'ppk',
    'actions',
  ];

  public visiblePayslipsMap: { [key: number]: boolean } = {};

  public get months(): Month[] {
    return this._months;
  }

  public set months(value: Month[]) {
    this._months = value;
    this.sumTotalNet = value.reduce((p, c) => p + c.taxation.totalNet, 0);
    this.avgTotalNet = this.sumTotalNet / value.length;
    this.sumPpk = value.reduce((p, c) => p + c.taxation.ppkContribution, 0);
    this.sumEmployerPpk = value.reduce((p, c) => p + c.taxation.ppkEmployerContribution, 0);
    this.sumEmployeePpk = value.reduce((p, c) => p + c.taxation.ppkEmployeeContribution, 0);
    this.sumIncomeTax = value.reduce((p, c) => p + c.taxation.incomeTax, 0);
    this.sumIncomeTax1 = value.reduce((p, c) => p + c.taxation.incomeTax1, 0);
    this.sumIncomeTax2 = value.reduce((p, c) => p + c.taxation.incomeTax2, 0);
    this.sumIncomeTax3 = value.reduce((p, c) => p + c.taxation.incomeTax3, 0);
   }

  public sumTotalNet: number = 0;
  public avgTotalNet: number = 0;
  public sumPpk: number = 0;
  public sumEmployerPpk: number = 0;
  public sumEmployeePpk: number = 0;
  public sumIncomeTax: number = 0;
  public sumIncomeTax1: number = 0;
  public sumIncomeTax2: number = 0;
  public sumIncomeTax3: number = 0;

  constructor(
    private readonly dialog: MatDialog,
    private readonly taxationService: TaxationService,
    private readonly taxAdditiveElementsCollection: TaxAdditiveElementsCollection
  ) {
  }

  public ngOnInit() {
    this.payslipsConfigurationSource.asObservable()
      .subscribe((payslipsConfiguration: PayslipsConfiguration) => {
        this.months = this.calculateMonths(payslipsConfiguration);
      });
  }

  public isPayslipVisible: (index: number, month: Month) => boolean = (index: number, month: Month) => {
    return this.visiblePayslipsMap[month.index];
  }

  public onTaxParametersChangeClick(month: Month): void {
    const dialogRef: MatDialogRef<TaxParametersDialogComponent> = this.dialog.open(TaxParametersDialogComponent, {
      width: '1280px',
      data: {
        taxParameters: this.months[month.index].taxParameters,
        pkupEnabled: true
      } as TaxParametersDialogOptions
    });

    dialogRef.afterClosed().subscribe((taxParameters: TaxParameters) => {
      this.months[month.index] = {
        ...month,
        taxParameters: taxParameters,
        taxAdditiveValues: this.syncTaxAdditiveValues(month.taxAdditiveValues, taxParameters)
      };

      this.months = this.recalculateMonths(this.months);
    });
  }

  public onTogglePayslipVisibilityClick: (month: Month) => void = (month: Month) => {
    this.visiblePayslipsMap[month.index] = !this.visiblePayslipsMap[month.index];
    this._months = [...this._months];
  }





  public onAddTaxAdditiveValue(month: Month): void {
    const dialogRef: MatDialogRef<TaxAdditiveDialogComponent> = this.dialog.open(TaxAdditiveDialogComponent, {
      width: '640px',
      data: {
        taxAdditives: this.taxAdditiveElementsCollection.getAll(),
        taxAdditiveValue: null
      }
    });

    dialogRef.afterClosed().subscribe(({ taxAdditive, value }: { taxAdditive: TaxAdditiveElement, value: number }) => {
      this.months[month.index] = {
        ...month,
        taxAdditiveValues: this.addOrUpdateTaxAdditiveValue(month.taxAdditiveValues, {
          id: taxAdditive.id,
          value: value
        })
      };

      this.months = this.recalculateMonths(this.months);
    });
  }

  public onEditTaxAdditiveValue(month: Month, taxAdditiveValue: TaxAdditiveValue): void {
    const dialogRef: MatDialogRef<TaxAdditiveDialogComponent> = this.dialog.open(TaxAdditiveDialogComponent, {
      width: '640px',
      data: {
        taxAdditives: this.taxAdditiveElementsCollection.getAll(),
        taxAdditiveValue: taxAdditiveValue
      }
    });

    dialogRef.afterClosed().subscribe(({ taxAdditive, value }: { taxAdditive: TaxAdditiveElement, value: number }) => {
      this.months[month.index] = {
        ...month,
        taxAdditiveValues: this.addOrUpdateTaxAdditiveValue(month.taxAdditiveValues, {
          id: taxAdditive.id,
          value: value
        })
      };

      this.months = this.recalculateMonths(this.months);
    });
  }

  public onRemoveTaxAdditiveValue(month: Month, taxAdditiveValue: TaxAdditiveValue): void {
    this.months[month.index] = {
      ...month,
      taxAdditiveValues: this.removeTaxAdditiveValue(month.taxAdditiveValues, taxAdditiveValue.id)
    };

    this.months = this.recalculateMonths(this.months);
  }

  public onAddPayslip(): void {
    const dialogRef: MatDialogRef<PayslipsGeneratorDialogComponent> = this.dialog.open(PayslipsGeneratorDialogComponent, {
      width: '1280px',
    });

    dialogRef.afterClosed().subscribe((payslipsConfiguration: PayslipsConfiguration) => {
      this.payslipsConfigurationSource.next(payslipsConfiguration);
    });
  }

  public trackBy(index: number, month: Month): any {
    return month.index;
  }

  private calculateMonths(payslipsConfiguration: PayslipsConfiguration): Month[] {
    const months: Month[] = [];

    const taxParameters: TaxParameters = {
      ...payslipsConfiguration.taxParameters,
      pkup: payslipsConfiguration.pkupEnabled
        ? payslipsConfiguration.baseSalary * 0.85
        : 0
    };

    let taxAdditiveValues: TaxAdditiveValue[] = [
      { id: TaxElementId.BaseSalaryTaxAdditive, value: payslipsConfiguration.baseSalary },
    ];

    taxAdditiveValues = this.syncTaxAdditiveValues(taxAdditiveValues, taxParameters);

    MONTHS.forEach((name, index) => {
      months[index] = {
        index: index,
        name: name,
        payslipParameters: {
          monthIndex: index,
          fullName: payslipsConfiguration.fullName,
          baseSalary: payslipsConfiguration.baseSalary
        },
        taxParameters: {
          ...taxParameters
        },
        taxAdditiveValues: [...taxAdditiveValues],
        taxation: this.calculateTaxation(
          taxParameters,
          taxAdditiveValues,
          months[index - 1]?.taxation.cumulativeTaxBase,
          months[index - 1]?.taxation.cumulativeRetirementDisabilityBase)
      };
    });

    return months;
  }

  private recalculateMonths(months: Month[]): Month[] {
    months = [...months];

    months.forEach((month, index) => {
      const taxParameters: TaxParameters = month.taxParameters;
      const taxAdditiveValues: TaxAdditiveValue[] = this.syncTaxAdditiveValues(month.taxAdditiveValues, taxParameters);

      months[index] = {
        ...month,
        taxAdditiveValues: taxAdditiveValues,
        taxation: this.calculateTaxation(
          taxParameters,
          taxAdditiveValues,
          months[index - 1]?.taxation.cumulativeTaxBase,
          months[index - 1]?.taxation.cumulativeRetirementDisabilityBase)
      };
    });

    return months;
  }

  private calculateTaxation(
    taxParameters: TaxParameters,
    taxAdditiveValues: TaxAdditiveValue[],
    cumulativeTaxBase: number,
    cumulativeRetirementDisabilityBase: number
  ): Taxation {
    return this.taxationService.calculate({
      taxAdditiveValues: taxAdditiveValues,
      pkup: taxParameters.pkup,
      ppkEnabled: taxParameters.ppkEnabled,
      ppkBasicEmployee: taxParameters.ppkBasicEmployee,
      ppkBasicEmployer: taxParameters.ppkBasicEmployer,
      ppkAdditionEmployee: taxParameters.ppkAdditionEmployee,
      ppkAdditionEmployer: taxParameters.ppkAdditionEmployer,
      liveOutside: taxParameters.liveOutside,
      pit2Enabled: taxParameters.pit2Enabled,
      tax1: taxParameters.tax1,
      taxThreshold12: taxParameters.taxThreshold12,
      tax2: taxParameters.tax2,
      taxThreshold23: taxParameters.taxThreshold23,
      tax3: taxParameters.tax3,
      retirementDisabilityBaseThreshold: taxParameters.retirementDisabilityBaseThreshold,
      cumulativeTaxBase: cumulativeTaxBase ?? 0,
      cumulativeRetirementDisabilityBase: cumulativeRetirementDisabilityBase ?? 0
    });
  }

  private syncTaxAdditiveValues(taxAdditiveValues: TaxAdditiveValue[], taxParameters: TaxParameters): TaxAdditiveValue[] {
    taxAdditiveValues = this.syncPkupTaxAdditiveValues(taxAdditiveValues, taxParameters);
    taxAdditiveValues = this.syncPpkTaxAdditiveValues(taxAdditiveValues, taxParameters);

    return taxAdditiveValues;
  }

  private syncPkupTaxAdditiveValues(taxAdditiveValues: TaxAdditiveValue[], taxParameters: TaxParameters): TaxAdditiveValue[] {
    if (taxParameters.pkup) {
      taxAdditiveValues = this.addOrUpdateTaxAdditiveValue(taxAdditiveValues, { id: TaxElementId.PkupTaxAdditive, value: taxParameters.pkup });
      taxAdditiveValues = this.addOrUpdateTaxAdditiveValue(taxAdditiveValues, { id: TaxElementId.PkupReduceTaxAdditive, value: -taxParameters.pkup });
    } else {
      taxAdditiveValues = this.removeTaxAdditiveValue(taxAdditiveValues, TaxElementId.PkupTaxAdditive);
      taxAdditiveValues = this.removeTaxAdditiveValue(taxAdditiveValues, TaxElementId.PkupReduceTaxAdditive);
    }

    return taxAdditiveValues;
  }

  private syncPpkTaxAdditiveValues(taxAdditiveValues: TaxAdditiveValue[], taxParameters: TaxParameters): TaxAdditiveValue[] {
    if (taxParameters.ppkEnabled) {
      const ppkIncome: number = this.taxationService.getPpkIncome({
        ppkEnabled: taxParameters.ppkEnabled,
        ppkBasicEmployee: taxParameters.ppkBasicEmployee,
        ppkBasicEmployer: taxParameters.ppkBasicEmployer,
        ppkAdditionEmployee: taxParameters.ppkAdditionEmployee,
        ppkAdditionEmployer: taxParameters.ppkAdditionEmployer,
      }, taxAdditiveValues);

      taxAdditiveValues = this.addOrUpdateTaxAdditiveValue(taxAdditiveValues, { id: TaxElementId.PpkIncomeTaxAdditive, value: ppkIncome });
    } else {
      taxAdditiveValues = this.removeTaxAdditiveValue(taxAdditiveValues, TaxElementId.PpkIncomeTaxAdditive);
    }

    return taxAdditiveValues;
  }

  private addOrUpdateTaxAdditiveValue(
    taxAdditiveValues: TaxAdditiveValue[],
    taxAdditiveValue: TaxAdditiveValue
  ): TaxAdditiveValue[] {
    taxAdditiveValues = [...taxAdditiveValues];

    const index: number = taxAdditiveValues.findIndex(_ => _.id === taxAdditiveValue.id);
    if (index >= 0) {
      taxAdditiveValues[index] = taxAdditiveValue;
    } else {
      taxAdditiveValues.push(taxAdditiveValue);
    }

    return taxAdditiveValues;
  }

  private removeTaxAdditiveValue(
    taxAdditiveValues: TaxAdditiveValue[],
    id: TaxElementId
  ): TaxAdditiveValue[] {
    return taxAdditiveValues.filter(_ => _.id !== id);
  }
}
