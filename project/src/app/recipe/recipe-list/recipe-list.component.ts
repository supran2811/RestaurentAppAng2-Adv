
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit} from '@angular/core';

import * as fromRecipe from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit  {

   recipes : Observable<fromRecipe.State>;

   

  constructor(private store:Store<fromRecipe.FeatureState> ) { }

  ngOnInit() {
      
     this.recipes = this.store.select("recipes");

  }
   
  
}
