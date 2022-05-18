import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaxAdditive } from '../models/tax-additive.model';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElement } from '../models/tax-element.model';
import { TaxAdditivesCollection } from '../services/tax-additives-collection.service';
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
  @Input('taxElement') public taxElementParam!: TaxElement;
  @Input('taxAdditive') public taxAdditiveParam!: TaxAdditive;
  @Input('value') public valueParam: any;

  @HostBinding('class.has-explanation') public hasExplanation: boolean = false;
  @HostBinding('class.highlight') public highlight: boolean = false;

  @HostListener('click') public onClick(): void {
    if (this.hasExplanation) {
      this.showExplanation();
    }
  }

  public taxElementId!: TaxElementId;
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
    private readonly taxElementsCollection: TaxElementsCollection,
    private readonly taxAdditivesCollection: TaxAdditivesCollection
  ) {
  }

  public ngOnInit(): void {
    this.taxElementId = this.getTaxElementId();
    this.name = this.getName();
    this.title = this.getTitle();
    this.hint = this.getHint();
    this.description = this.getDescription();
    this.formula = this.getFormula();
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
      this.taxElementRegistryService.get(taxElementId).highlight = true;
    });
  }

  public onAfterCloseFormulaPopover(): void {
    this.formulaRelatedTaxElementIds.forEach(taxElementId => {
      this.taxElementRegistryService.get(taxElementId).highlight = false;
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

  private getTaxElementId(): TaxElementId {
    return this.taxElementParam?.id ?? this.taxAdditiveParam?.id;
  }

  private getName(): string {
    return this.taxElementParam?.name ?? this.taxAdditiveParam?.name ?? '';
  }

  private getTitle(): string {
    return this.taxElementParam?.title ?? this.taxAdditiveParam?.title ?? '';
  }

  private getDescription(): string {
    return this.taxElementParam?.description ?? this.taxAdditiveParam?.description ?? '';
  }

  private getFormula(): string {
    return this.taxElementParam?.formula ?? '';
  }

  private getHint(): string {
    return this.taxElementParam?.hint ?? this.taxAdditiveParam?.hint ?? '';
  }

  private getFormulaRelatedTaxElementIds(formula: string): TaxElementId[] {
    const relatedElementMatcher: RegExp = /\[(\w+)\]/ig;
    const relatedElementMatches = formula.matchAll(relatedElementMatcher);

    return [...relatedElementMatches].map(_ => _[1] as TaxElementId);
  }

  private formatFormula(formula: string): string {
    const relatedElementMatcher: RegExp = /(\[(\w+)\])/ig;

    return formula.replaceAll(relatedElementMatcher, (m, v1, v2) => {
      return this.taxElementsCollection.getById(v2)?.name ?? this.taxAdditivesCollection.getById(v2)?.name ?? v2;
    });
  }
}
