import { globalReducers } from './store/app.reducer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { Ingredient } from './model/ingredient.model';
import { AuthReducer } from './auth/store/auth.reducer';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './modules/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthEffect } from './auth/store/auth.effect';


import {shoppingListReducer} from './shopping-list/store/shoppint-list.reducer';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(globalReducers),
    EffectsModule.forRoot([AuthEffect])
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
