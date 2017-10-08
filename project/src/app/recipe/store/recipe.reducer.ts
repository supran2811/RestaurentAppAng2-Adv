import { Action } from '@ngrx/store';

import * as RecipeActions from './recipe.action';
import { Ingredient } from './../../model/ingredient.model';
import { Recipe } from './../../model/recipe.model';
import * as fromApp from '../../store/app.reducer';

export interface FeatureState extends fromApp.AppState {
    recipes:State
}

export interface State{
    recipes:Recipe[]
}

export const initialState:State = {
    recipes : [new Recipe("Chicken Curry" , 
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

      ])]
}

export function recipeReducer(state = initialState,action:RecipeActions.RecipeActions){

    switch(action.type){
        case RecipeActions.ADD_RECIPE:{
              return {
                  ...state,
                  recipes:[...state.recipes , action.payload]
              }  
        }
        case RecipeActions.UPDATE_RECIPE :{
            const oldRecipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...oldRecipe,
                ...action.payload.newRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes:recipes
            }
        }
        case RecipeActions.DELETE_RECIPE:{
            const recipes = [...state.recipes];

            recipes.splice(action.payload,1);

            return {
                ...state,
                recipes: recipes
            }
        }
        case RecipeActions.SET_RECIPE:{
            return {
                ...state,
                recipes:[...action.payload]
            }
        }
    }
    return state;
}