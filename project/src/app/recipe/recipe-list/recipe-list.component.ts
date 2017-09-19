import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import {RecipeListService} from '../../services/recipe-list.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit , OnDestroy {

   recipes : Recipe[];
   recipeListUpdatedSubscription : Subscription;

  constructor(private recipeListService : RecipeListService) { }

  ngOnInit() {
     this.recipes = this.recipeListService.getRecipes();

     this.recipeListUpdatedSubscription = this.recipeListService.recipeListUpdated.subscribe(
       (recipes:Recipe[]) => {
            this.recipes = recipes;
       }
     );
  }
    
  ngOnDestroy(){
    this.recipeListUpdatedSubscription.unsubscribe();
  } 
  
}
