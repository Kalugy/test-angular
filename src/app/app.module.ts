import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button'


import { OrdersComponent } from './orders/orders.component';

//add
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import {MaterialExampleModule} from './material.module';
import {DialogOverviewExampleDialog} from './orders/dialog/dialog';


@NgModule({
  declarations: [AppComponent, OrdersComponent,DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
