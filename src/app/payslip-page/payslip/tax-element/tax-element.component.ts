import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaxAdditive } from '../models/tax-additive.model';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';
import { TaxElementRegistryService } from '../services/tax-element-registry.service';
import {
  TaxElementExplanationDialogComponent
} from '../tax-element-explanation-dialog/tax-element-explanation-dialog.component';

@Component({
  selector: 'app-tax-element',
  templateUrl: './tax-element.component.html',
  styleUrls: ['./tax-element.component.scss']
})
export class TaxElementComponent implements OnInit, OnDestroy {
  @Input('taxElement') public taxElementParam!: TaxElement;
  @Input('taxAdditive') public taxAdditiveParam!: TaxAdditive;
  @Input('taxElementId') public taxElementIdParam!: TaxElementId;

  @HostBinding('class.default-view') public defaultViewEnabled: boolean = false;

  @HostListener('click') public onClick(): void {
    this.showExplanation();
  }

  public taxElementId!: TaxElementId;
  public name!: string;
  public title!: string;
  public description!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly taxElementRegistryService: TaxElementRegistryService
  ) {
  }

  public ngOnInit(): void {
    this.taxElementId = this.getTaxElementId();
    this.name = this.getName();
    this.title = this.getTitle();
    this.description = this.getDescription();
    this.defaultViewEnabled = !!this.taxElementParam || !!this.taxAdditiveParam;

    if (this.taxElementId) {
      this.taxElementRegistryService.add(this.taxElementId, this);
    }
  }

  public ngOnDestroy(): void {
    if (this.taxElementId) {
      this.taxElementRegistryService.remove(this.taxElementId);
    }
  }

  private showExplanation(): void {
    this.dialog.open(TaxElementExplanationDialogComponent, {
      width: '600px',
      data: {
        title: this.title,
        description: this.description,
      },
    });
  }

  private getTaxElementId(): TaxElementId {
    return this.taxElementParam?.id ?? this.taxAdditiveParam?.id ?? this.taxElementIdParam;
  }

  private getName(): string {
    return this.taxElementParam?.name ?? this.taxAdditiveParam?.name;
  }

  private getTitle(): string {
    return this.taxElementParam?.title ?? this.taxAdditiveParam?.title;
  }

  private getDescription(): string {
    return this.taxElementParam?.description ?? this.taxAdditiveParam?.description;
  }
}
