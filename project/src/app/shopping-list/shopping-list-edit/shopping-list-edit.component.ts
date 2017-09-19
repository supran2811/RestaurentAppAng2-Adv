import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from "../../model/ingredient.model";
import {ShoppingListService} from '../../services/shoppint-list.service';
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
  
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
   this.ingredientSelectedSubscription =  
        this.shoppingListService.ingredientSelectedEmitter.subscribe(
                  (index:number) => {
                          this.isEditing = true;
                          this.selectedIndex = index;
                          this.selectedIngredient = this.shoppingListService.getIngredient(index);
                          this.myForm.setValue({
                              name : this.selectedIngredient.name,
                              amount : +this.selectedIngredient.amount
                          });
                  }
                );
  }
  
   onSubmit(shoppingListForm : NgForm){
     let ingredient = new Ingredient(shoppingListForm.value.name,shoppingListForm.value.amount);
     if(this.isEditing == false){
        this.shoppingListService.addIngredient(ingredient);
     }
     else{
        this.shoppingListService.updateIngredient(ingredient , this.selectedIndex);
     }
     this.reset();
   }

  reset(){
     this.myForm.reset();
     this.isEditing = false;
  }

  onDelete(){
    this.shoppingListService.removeIngredient(this.selectedIndex);
    this.reset();
  }

   ngOnDestroy(){
     this.ingredientSelectedSubscription.unsubscribe();
   }
}
