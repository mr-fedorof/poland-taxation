import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { startWith } from 'rxjs';
import { MONTHS } from '../../../modules/date';
import { TaxAdditiveValue, Taxation, TaxationService } from '../../taxation/taxation.service';
import { TaxAdditiveElement } from './models/tax-additive-element.model';
import { TaxElementId } from './models/tax-element-id.model';
import { TaxAdditiveElementsCollection } from './services/tax-additive-elements-collection.service';
import { TaxElementRegistryService } from './services/tax-element-registry.service';
import { TaxElementsCollection } from './services/tax-elements-collection.service';
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
  public taxAdditives!: TaxAdditiveElement[];

  constructor(
    private readonly taxationService: TaxationService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    public readonly taxElementsCollection: TaxElementsCollection,
    public readonly taxAdditivesCollection: TaxAdditiveElementsCollection
  ) {
  }

  public ngOnInit(): void {
    this.taxAdditives = this.taxAdditivesCollection.getAll();

    this.customizationForm = this.formBuilder.group({
      month: this.formBuilder.control(0),
      tax1: this.formBuilder.control(0),
      taxThreshold12: this.formBuilder.control(30000),
      tax2: this.formBuilder.control(17),
      taxThreshold23: this.formBuilder.control(120000),
      tax3: this.formBuilder.control(32),
      retirementDisabilityBaseThreshold: this.formBuilder.control(177660),
      pkup: this.formBuilder.control(0),
      liveOutside: this.formBuilder.control(false),
      ppkEnabled: this.formBuilder.control(false),
      pit2Enabled: this.formBuilder.control(true),
      taxAdditives: this.formBuilder.array([]),
    });

    this.customizationForm.controls['pkup'].valueChanges
      .pipe(startWith(this.customizationForm.value.pkup))
      .subscribe((value: number) => {
        const pkupEnable: boolean = Boolean(value) && value > 0;

        if (pkupEnable) {
          this.addOrUpdateTaxAdditive(this.taxAdditivesCollection.pkupTaxAdditive, value);
          this.addOrUpdateTaxAdditive(this.taxAdditivesCollection.pkupReduceTaxAdditive, -value);
        } else {
          this.removeTaxAdditiveById(TaxElementId.PkupTaxAdditive);
          this.removeTaxAdditiveById(TaxElementId.PkupReduceTaxAdditive);
        }
      });

    this.customizationForm.valueChanges
      .pipe(startWith(this.customizationForm.value))
      .subscribe(value => {
        this.taxation = this.taxationService.calculate({
          taxAdditives: value.taxAdditives,
          pkup: +value.pkup,
          ppkEnabled: value.ppkEnabled,
          liveOutside: value.liveOutside,
          pit2Enabled: value.pit2Enabled,
          tax1: value.tax1,
          taxThreshold12: value.taxThreshold12,
          tax2: value.tax2,
          taxThreshold23: value.taxThreshold23,
          tax3: value.tax3,
          retirementDisabilityBaseThreshold: value.retirementDisabilityBaseThreshold
        });
      });

    this.addOrUpdateTaxAdditive(this.taxAdditivesCollection.getByName('wynagr.zasad./m')!, 10000);
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
        this.addOrUpdateTaxAdditive(result.taxAdditive, result.value);
      }
    });
  }

  public onTaxAdditiveDeleteClick(index: number): void {
    this.removeTaxAdditive(index);
  }

  public sumTaxAdditives(taxAdditives: TaxAdditiveValue[], taxable: boolean): number {
    return taxAdditives.filter(_ => _.taxable === taxable).reduce((p, c) => p + c.value, 0);
  }

  private addOrUpdateTaxAdditive(taxAdditive: TaxAdditiveElement, value: number): void {
    const additivesFormArray: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;
    const additives: TaxAdditiveValue[] = additivesFormArray.value;
    const index: number = additives.findIndex(_ => _.id === taxAdditive.id);

    if (index < 0) {
      additivesFormArray.push(this.formBuilder.control({
        id: taxAdditive.id,
        taxable: taxAdditive.taxable,
        value: +value
      }));
    } else {
      additivesFormArray.at(index).setValue({
        id: taxAdditive.id,
        taxable: taxAdditive.taxable,
        value: +value
      });
    }
  }

  private removeTaxAdditiveById(id: TaxElementId): void {
    const additivesFormArray: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;
    const additives: TaxAdditiveValue[] = additivesFormArray.value;
    const index: number = additives.findIndex(_ => _.id === id);

    if (index >= 0) {
      additivesFormArray.removeAt(index);
    }
  }

  private removeTaxAdditive(index: number): void {
    const additivesFormGroup: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;

    additivesFormGroup.removeAt(index);
  }
}
