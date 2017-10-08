import { Recipe } from './../../model/recipe.model';

import { Action } from '@ngrx/store';



export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const SET_RECIPE = "SET_RECIPE";
export const FETCH_RECIPE = "FETCH_RECIPE";
export const STORE_RECIPE = "STORE_RECIPE";

export class AddRecipeAction implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload:Recipe){}
}

export class UpdateRecipeAction implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload:{ index : number , newRecipe:Recipe}){}
}

export class DeleteRecipeAction implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload:number){}
}

export class SetRecipeAction implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload:Recipe[]){}
}

export class FetchRecipeAction implements Action {
    readonly type = FETCH_RECIPE;
}

export class StoreRecipeAction implements Action {
    readonly type = STORE_RECIPE;
}


export type RecipeActions = AddRecipeAction|UpdateRecipeAction|DeleteRecipeAction|SetRecipeAction|FetchRecipeAction|StoreRecipeAction;