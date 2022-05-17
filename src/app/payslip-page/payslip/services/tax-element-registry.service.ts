import { Injectable } from '@angular/core';
import { TaxElementId } from '../models/tax-element-id.model';
import { TaxElementComponent } from '../tax-element/tax-element.component';

@Injectable()
export class TaxElementRegistryService {
  private readonly map: Map<TaxElementId, TaxElementComponent> = new Map<TaxElementId, TaxElementComponent>();

  public add(taxElementId: TaxElementId, taxElementComponent: TaxElementComponent): void {
    this.map.set(taxElementId, taxElementComponent);
  }

  public remove(taxElementId: TaxElementId): void {
    this.map.delete(taxElementId);
  }

  public get(taxElementId: TaxElementId): TaxElementComponent {
    return this.map.get(taxElementId)!;
  }
}
