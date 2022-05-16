import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TaxationRoutingModule } from './taxation-routing.module';
import { TaxationComponent } from './taxation.component';
import { PayslipComponent } from './payslip/payslip.component';
import { TaxAdditiveComponent } from './payslip/tax-additive/tax-additive.component';

@NgModule({
  declarations: [
    TaxationComponent,
    PayslipComponent,
    TaxAdditiveComponent
  ],
  imports: [
    TaxationRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    TaxationComponent
  ]
})
export class TaxationModule { }
