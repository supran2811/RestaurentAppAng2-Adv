import { Component, OnInit } from '@angular/core';
// import { Recipe } from "../model/recipe.model";
import { RecipeListService } from '../services/recipe-list.service';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
  
})
export class RecipeComponent implements OnInit {

  // selectedRecipe:Recipe;

  constructor(private recipeListService : RecipeListService) { }

  ngOnInit() {
    //  this.recipeListService.selectedRecipe.subscribe(
    //      (recipe:Recipe) => {this.selectedRecipe = recipe}
    //    )  ;
  }

}
