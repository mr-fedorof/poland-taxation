import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';
import { TaxElementRegistryService } from '../services/tax-element-registry.service';
import { TaxElementsCollection } from '../services/tax-elements-collection.service';
import {
  TaxElementExplanationDialogComponent
} from '../tax-element-explanation-dialog/tax-element-explanation-dialog.component';

@Component({
  selector: 'app-tax-element',
  templateUrl: './tax-element.component.html',
  styleUrls: ['./tax-element.component.scss']
})
export class TaxElementComponent implements OnInit, OnDestroy {
  @Input() public taxElement: TaxElement | null | undefined;
  @Input() public value: any;

  @HostBinding('class.has-explanation') public hasExplanation: boolean = false;
  @HostBinding('class.highlight') public highlight: boolean = false;

  @HostListener('click') public onClick(): void {
    if (this.hasExplanation) {
      this.showExplanation();
    }
  }

  public taxElementId!: TaxElementId | null;
  public name!: string;
  public formula!: string;
  public hint!: string;
  public formattedFormula!: string;
  public formulaRelatedTaxElementIds!: TaxElementId[];
  public title!: string;
  public description!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly taxElementRegistryService: TaxElementRegistryService,
    private readonly taxElementsCollection: TaxElementsCollection
  ) {
  }

  public ngOnInit(): void {
    this.taxElementId = this.taxElement?.id ?? null;
    this.name = this.taxElement?.name ?? '';
    this.title = this.taxElement?.title ?? '';
    this.hint = this.taxElement?.hint ?? '';
    this.description = this.taxElement?.description ?? '';
    this.formula = this.taxElement?.formula ?? '';
    this.formulaRelatedTaxElementIds = this.getFormulaRelatedTaxElementIds(this.formula);
    this.formattedFormula = this.formatFormula(this.formula);
    this.hasExplanation = !!this.title || !!this.description;

    if (this.taxElementId) {
      this.taxElementRegistryService.add(this.taxElementId, this);
    }
  }

  public ngOnDestroy(): void {
    if (this.taxElementId) {
      this.taxElementRegistryService.remove(this.taxElementId);
    }
  }

  public onAfterOpenFormulaPopover(): void {
    this.formulaRelatedTaxElementIds.forEach(taxElementId => {
      const taxElementComponent = this.taxElementRegistryService.get(taxElementId);
      if (taxElementComponent) {
        taxElementComponent.highlight = true;
      }
    });
  }

  public onAfterCloseFormulaPopover(): void {
    this.formulaRelatedTaxElementIds.forEach(taxElementId => {
      const taxElementComponent = this.taxElementRegistryService.get(taxElementId);
      if (taxElementComponent) {
        taxElementComponent.highlight = false;
      }
    });
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

  private getFormulaRelatedTaxElementIds(formula: string): TaxElementId[] {
    const relatedElementMatcher: RegExp = /\[(\w+)\]/ig;
    const relatedElementMatches = formula.matchAll(relatedElementMatcher);

    return [...relatedElementMatches].map(_ => _[1] as TaxElementId);
  }

  private formatFormula(formula: string): string {
    const relatedElementMatcher: RegExp = /(\[(\w+)\])/ig;

    return formula.replaceAll(relatedElementMatcher, (m, v1, v2) => {
      return this.taxElementsCollection.getById(v2)?.name ?? v2;
    });
  }
}
