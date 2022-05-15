import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TaxationRoutingModule } from './taxation-routing.module';
import { TaxationComponent } from './taxation.component';

@NgModule({
  declarations: [
    TaxationComponent
  ],
  imports: [
    TaxationRoutingModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    TaxationComponent
  ]
})
export class TaxationModule { }
