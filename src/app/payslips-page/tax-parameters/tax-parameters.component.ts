import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControlStatus, FormGroup } from '@angular/forms';
import { distinctUntilChanged, startWith } from 'rxjs';
import { TaxParameters } from './tax-parameters.model';

@Component({
  selector: 'app-tax-parameters',
  templateUrl: './tax-parameters.component.html',
  styleUrls: ['./tax-parameters.component.scss']
})
export class TaxParametersComponent implements OnInit {
  public form!: FormGroup;

  @Input() public pkupEnabled: boolean = true;
  @Input() public retirementDisabilityBaseThresholdEnabled: boolean = true;

  @Input() public baseTaxParameters: TaxParameters | null = null;

  @Output() public readonly taxParametersChange: EventEmitter<TaxParameters> = new EventEmitter<TaxParameters>();
  @Output() public readonly taxParametersValidationChange: EventEmitter<FormControlStatus> = new EventEmitter<FormControlStatus>();

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      tax1: this.formBuilder.control(this.baseTaxParameters?.tax1 ?? 0),
      taxThreshold12: this.formBuilder.control(this.baseTaxParameters?.taxThreshold12 ?? 30000),
      tax2: this.formBuilder.control(this.baseTaxParameters?.tax2 ?? 17),
      taxThreshold23: this.formBuilder.control(this.baseTaxParameters?.taxThreshold23 ?? 120000),
      tax3: this.formBuilder.control(this.baseTaxParameters?.tax3 ?? 32),
      retirementDisabilityBaseThreshold: this.formBuilder.control({
        value: this.baseTaxParameters?.retirementDisabilityBaseThreshold ?? 177660,
        disabled: !this.retirementDisabilityBaseThresholdEnabled
      }),
      pkup: this.formBuilder.control({
        value: this.baseTaxParameters?.pkup ?? 0,
        disabled: !this.pkupEnabled
      }),
      liveOutside: this.formBuilder.control(this.baseTaxParameters?.liveOutside ?? false),
      ppkEnabled: this.formBuilder.control(this.baseTaxParameters?.ppkEnabled ?? false),
      ppkBasicEmployee: this.formBuilder.control(this.baseTaxParameters?.ppkBasicEmployee ?? 2),
      ppkBasicEmployer: this.formBuilder.control(this.baseTaxParameters?.ppkBasicEmployer ?? 1.5),
      ppkAdditionEmployee: this.formBuilder.control(this.baseTaxParameters?.ppkAdditionEmployee ?? 0),
      ppkAdditionEmployer: this.formBuilder.control(this.baseTaxParameters?.ppkAdditionEmployer ?? 0),
      pit2Enabled: this.formBuilder.control(this.baseTaxParameters?.pit2Enabled ?? true),
    });

    this.form.controls['ppkEnabled'].valueChanges
      .pipe(startWith(this.form.controls['ppkEnabled'].value), distinctUntilChanged())
      .subscribe((value: boolean) => {
        if (value) {
          this.form.controls['ppkBasicEmployee'].enable();
          this.form.controls['ppkBasicEmployer'].enable();
          this.form.controls['ppkAdditionEmployee'].enable();
          this.form.controls['ppkAdditionEmployer'].enable();
        } else {
          this.form.controls['ppkBasicEmployee'].disable();
          this.form.controls['ppkBasicEmployer'].disable();
          this.form.controls['ppkAdditionEmployee'].disable();
          this.form.controls['ppkAdditionEmployer'].disable();
        }
      });

    this.form.valueChanges
      .pipe(startWith(this.form.value))
      .subscribe((value: TaxParameters) => {
        this.taxParametersChange.emit(value);
      });

    this.form.statusChanges
      .pipe(startWith(this.form.status))
      .subscribe((status: FormControlStatus) => {
        this.taxParametersValidationChange.emit(status);
      });
  }
}
