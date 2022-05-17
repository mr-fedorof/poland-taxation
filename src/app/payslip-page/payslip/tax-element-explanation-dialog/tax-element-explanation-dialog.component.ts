import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxElement } from '../models/tax-element.model';

@Component({
  selector: 'app-tax-element-explanation-dialog',
  templateUrl: './tax-element-explanation-dialog.component.html',
  styleUrls: ['./tax-element-explanation-dialog.component.scss']
})
export class TaxElementExplanationDialogComponent {
  public title: string;
  public description: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { title: string, description: string }
  ) {
    this.title = data.title;
    this.description = data.description;
  }
}
