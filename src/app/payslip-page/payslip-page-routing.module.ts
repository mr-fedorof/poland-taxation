import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayslipPageComponent } from './payslip-page.component';

const routes: Routes = [
  { path: '', component: PayslipPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayslipPageRoutingModule { }
