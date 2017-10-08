import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AddIngredientAction } from './../store/shopping-list.actions';
import * as fromAppState from './../../store/app.reducer';
import { Ingredient } from "../../model/ingredient.model";
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shoppint-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit , OnDestroy{
  
  @ViewChild('f') myForm : NgForm;
  selectedIngredient : Ingredient;
  selectedIndex : number;
  ingredientSelectedSubscription : Subscription;
  isEditing = false;
  
  constructor(private store:Store<fromAppState.AppState>) { }

  ngOnInit() {

    this.ingredientSelectedSubscription = this.store.select("shoppingList")
                                                    .subscribe(
                                                        (data:fromShoppingList.State)  => {
                                                         
                                                          if(data.editIngredientIndex > -1){
                                                            this.isEditing = true;
                                                            this.selectedIndex = data.editIngredientIndex;
                                                            this.selectedIngredient = data.editIngredient;
                                                            this.myForm.setValue({
                                                                name : this.selectedIngredient.name,
                                                                amount : +this.selectedIngredient.amount
                                                            });
                                                          }
                                                          else{
                                                            this.isEditing = false;
                                                          }
                                                        }
                                                    )

   
                
  }
  
   onSubmit(shoppingListForm : NgForm){
     let ingredient = new Ingredient(shoppingListForm.value.name,shoppingListForm.value.amount);
     if(this.isEditing == false){
        //this.shoppingListService.addIngredient(ingredient);
        this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredient));
     }
     else{
       // this.shoppingListService.updateIngredient(ingredient , this.selectedIndex);
       this.store.dispatch(new ShoppingListActions.UpdateIngredientAction(ingredient));
     }
     this.reset();
   }

  reset(){
     this.myForm.reset();
     this.isEditing = false;
  }

  onDelete(){
   // this.shoppingListService.removeIngredient(this.selectedIndex);
   this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    this.reset();
  }

   ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.ResetIngredientAction());
     this.ingredientSelectedSubscription.unsubscribe();
   }
}
