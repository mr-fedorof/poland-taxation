import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'taxation', loadChildren: () => import('../taxation/taxation.module').then(m => m.TaxationModule) },
  { path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**',   redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
