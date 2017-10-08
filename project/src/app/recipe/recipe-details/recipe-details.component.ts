
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromAppState from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Recipe } from '../../model/recipe.model';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.action';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
   
  recipe : Recipe; 
  index : number;

  constructor(private activeRoute : ActivatedRoute,
              private router:Router,
              private store : Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
          this.activeRoute.params.subscribe(
            (params:Params) =>{
              this.index = +params['id'];
              
              this.store.select('recipes').take(1).subscribe((data:fromRecipe.State)=>{
                      this.recipe = data.recipes[this.index];    
              })
              
              
            }
          ); 
  }

  addToShoppingList(){
       this.store.dispatch(new ShoppingListActions.AddIngredientsAction(this.recipe.ingredients));
  } 

  deleteRecipe(){
        this.store.dispatch(new RecipeActions.DeleteRecipeAction(this.index));
        this.router.navigate(['../'],{relativeTo:this.activeRoute});
  }
}
