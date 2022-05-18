import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { startWith } from 'rxjs';
import { MONTHS } from '../../../modules/date';
import { TaxAdditiveValue, Taxation, TaxationService } from '../../taxation/taxation.service';
import { TaxAdditive } from './models/tax-additive.model';
import { TaxAdditivesCollection } from './services/tax-additives-collection.service';
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
  public taxAdditives!: TaxAdditive[];

  constructor(
    private readonly taxationService: TaxationService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    public readonly taxElementsCollection: TaxElementsCollection,
    public readonly taxAdditivesCollection: TaxAdditivesCollection
  ) {
  }

  public ngOnInit(): void {
    this.taxAdditives = this.taxAdditivesCollection.getVisibleTaxAdditives();

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

  public onTaxAdditiveDeleteClick(index: number): void {
    this.removeTaxAdditive(index);
  }

  public sumTaxAdditives(taxAdditives: TaxAdditiveValue[], taxable: boolean): number {
    return taxAdditives.filter(_ => _.taxable === taxable).reduce((p, c) => p + c.value, 0);
  }

  private addTaxAdditive(taxAdditive: TaxAdditive, value: number): void {
    const additivesFormGroup: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;

    additivesFormGroup.push(this.formBuilder.control({
      id: taxAdditive.id,
      taxable: taxAdditive.taxable,
      value: +value
    }));
  }

  private removeTaxAdditive(index: number): void {
    const additivesFormGroup: FormArray = this.customizationForm.controls['taxAdditives'] as FormArray;

    additivesFormGroup.removeAt(index);
  }
}
