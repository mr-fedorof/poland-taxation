import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    WelcomeRoutingModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
