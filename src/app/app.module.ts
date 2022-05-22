import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PayslipsPageModule } from './payslips-page/payslips-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    PayslipsPageModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
