import { Action } from '@ngrx/store';

import { Ingredient } from './../../model/ingredient.model';


export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const EDIT_INGREDIENT   = "EDIT_INGREDIENT";
export const RESET_INGREDIENT   = "RESET_INGREDIENT";

export class AddIngredientAction implements Action{
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredientsAction implements Action{
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredientAction implements Action{
    readonly type = UPDATE_INGREDIENT;
   constructor(public payload:Ingredient){}
}

export class DeleteIngredientAction implements Action{
    readonly type = DELETE_INGREDIENT;
  
}

export class EditIngredientAction implements Action{
    readonly type = EDIT_INGREDIENT;
    constructor(public payload: number) {}
}

export class ResetIngredientAction implements Action{
    readonly type = RESET_INGREDIENT;
}



export type ShoppingListActions = AddIngredientAction | 
                                        AddIngredientsAction | 
                                                UpdateIngredientAction |
                                                    DeleteIngredientAction|
                                                    EditIngredientAction|
                                                    ResetIngredientAction;

