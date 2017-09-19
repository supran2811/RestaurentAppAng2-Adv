import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppRouterModule } from '../modules/app-router.module';
import { SharedModule } from './../modules/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
   declarations:[
    ShoppingListComponent,
    ShoppingListEditComponent
   ],

   imports:[
      CommonModule,
      FormsModule
   ]
   
})
export class ShoppingListModule {

}