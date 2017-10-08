import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as RecipeActions from './recipe.action';
import { Recipe } from './../../model/recipe.model';
import { HttpService } from './../../services/http-service.service';
import * as fromRecipe from './recipe.reducer';

@Injectable()
export class RecipeEffects{
    URL = "https://my-recipe-book-b5271.firebaseio.com/recipe.json";

    @Effect() fetchRecipes = this.actions$.ofType(RecipeActions.FETCH_RECIPE)
                                        .switchMap(() => {
                                            return  this.httpService.get(this.URL);
                                        })
                                        .map((recipes:Recipe[]) =>{
                                            this.router.navigate(["recipes"]);    
                                            return {
                                                type:RecipeActions.SET_RECIPE,
                                                payload:recipes
                                            }
                                        });
    @Effect({dispatch:false}) storeRecipes = this.actions$.ofType(RecipeActions.STORE_RECIPE)
                                                    .withLatestFrom(this.store.select('recipes'))
                                                    .do(([action,state]) =>{
                                                        console.log("saving...");
                                                        console.log(state.recipes);
                                                        this.httpService.save(this.URL , state.recipes).subscribe(
                                                            (response) => {console.log(response)},
                                                            (error:Response) => {console.log(error)}
                                                         )
                                                    })
                                                                        

    constructor(private actions$:Actions
            ,private httpService:HttpService
            , private router:Router,
             private store:Store<fromRecipe.FeatureState>){}
}