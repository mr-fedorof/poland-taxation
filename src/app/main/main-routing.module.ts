import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'payslip', loadChildren: () => import('../payslip-page/payslip-page.module').then(m => m.PayslipPageModule) },
  { path: '',   redirectTo: '/payslip', pathMatch: 'full' },
  { path: '**',   redirectTo: '/payslip' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
