import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    MainRoutingModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
