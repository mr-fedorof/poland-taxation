import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
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
      pit2Enabled: this.formBuilder.control(this.baseTaxParameters?.pit2Enabled ?? true),
    });

    this.form.valueChanges
      .pipe(startWith(this.form.value))
      .subscribe((value: TaxParameters) => {
        this.taxParametersChange.emit(value);
      });
  }
}
