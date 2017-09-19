import { Recipe } from './../model/recipe.model';

import { Response } from '@angular/http';
import { HttpService } from './http-service.service';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Rx';
import {Injectable } from '@angular/core';

import {Ingredient} from '../model/ingredient.model';


import {ShoppingListService} from '../services/shoppint-list.service';
import "rxjs/Rx";

@Injectable()
export class RecipeListService {
    
    

    private recipes : Recipe[] = [
     new Recipe("Chicken Curry" , 
               "Spicey chicken curry" , 
               "http://indianhealthyrecipes.com/wp-content/uploads/2014/11/chicken-curry-recipe-12.5.jpg",
              [
                new Ingredient('chicken' , 2),
                new Ingredient('Chicken masala' , 1),
                new Ingredient('Tikhalal', 3)
              ]),
     new Recipe("Mutton keema" , 
                "Tasty mutton smashed with oil" , 
                 "http://www.indobase.com/recipes/rec-images/mutton-keema.jpg" ,
                 [
                     new Ingredient('mutton' , 2),
                     new Ingredient('mutton masala' , 1),
                     new Ingredient('Tikhalal', 3)

                 ])
  ];
  
  recipeListUpdated = new Subject<Recipe[]>();
   
   URL = "https://my-recipe-book-b5271.firebaseio.com/recipe.json";

  constructor(private shoppingList : ShoppingListService,
                private httpService : HttpService ){}


   getRecipes(){
     return this.recipes.slice();
   }


   getRecipe(index:number){
     return this.recipes[index];
   }

   addToShoppingList(recipe:Recipe){
     this.shoppingList.addIngredients(recipe.ingredients);
   } 

   addRecipe(newRecipe:Recipe){
     this.recipes.push(newRecipe);
     this.recipeListUpdated.next(this.getRecipes());
   }

   updateRecipe(id:number , updatedRecipe:Recipe){
      this.recipes[id] = updatedRecipe;
      this.recipeListUpdated.next(this.getRecipes());
   }

   deleteRecipe(index:number){
     this.recipes.splice(index,1);
     this.recipeListUpdated.next(this.getRecipes());
   }
  
   save(){
     this.httpService.save(this.URL , this.recipes).subscribe(
        (response:Response) => {console.log(response)},
        (error:Response) => {console.log(error)}
     )
   }

   sync(){
     this.httpService.get(this.URL).map(
           (recipes : Recipe[]) => {
                   for(let recipe of recipes){

                      if( !recipe.ingredients ){
                         recipe.ingredients = [];
                      }
                   }  
                   return recipes;
           }
     ).subscribe(
       (recipes:Recipe[]) => {
         console.log(recipes);
          this.recipes = recipes;
          this.recipeListUpdated.next(this.getRecipes());
        }
     )
   }
}