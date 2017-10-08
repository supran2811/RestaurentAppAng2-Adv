
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Store} from '@ngrx/store';


import * as fromAuthData from '../../auth/store/auth.reducer';
import * as fromAppState from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.action';
import * as fromRecipe from '../../recipe/store/recipe.reducer';
import * as RecipeActions from '../../recipe/store/recipe.action';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  
  
  authenticated : Observable<boolean>;
  
  constructor( private router:Router,
                  public store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.authenticated = this.store.select('auth').map((authState:fromAuthData.State) => {
        return authState.authorised;
    });
   
  }
  
  onSave(){
    this.store.dispatch(new RecipeActions.StoreRecipeAction());
  }

  onFetch(){
    this.store.dispatch(new RecipeActions.FetchRecipeAction());
  }

  logOut(){
    this.store.dispatch(new AuthActions.SignOutAction());
  }
  
}
