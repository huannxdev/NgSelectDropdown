import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectDropdownModule } from 'dist/ng-select-dropdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
