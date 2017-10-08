import { State } from './../auth/store/auth.reducer';
import { animate, Component, OnDestroy, OnInit, style, transition, trigger } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromShoppingList from './store/shoppint-list.reducer';
import * as fromAppState from '../store/app.reducer'
import * as ShoppingListActions from './store/shopping-list.actions';
import { Ingredient } from '../model/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations:[
    trigger('list1',[
      
            transition('void => *' , [
                style({
                     opacity:0,
                     transform : 'translateX(-100px)',
                     backgroundColor:'green'
                }),
                animate(500)
            ]),
    
            transition('* => void' , [
              animate(500 , style({
                  opacity  : 0,
                  transform : 'translateX(100px)',
                  backgroundColor : 'red'
              }))
          ])
        ])
  ]
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  
  shoppingListData : Observable<fromShoppingList.State>;
  ingredientAddedSubscription : Subscription;

  constructor(private store:Store<fromAppState.AppState>) { 

  }

  ngOnInit() {
      this.shoppingListData = this.store.select('shoppingList');//this.shoppingListService.getIngredients();
  }

  ngOnDestroy(){
    
    //this.ingredientAddedSubscription.unsubscribe();
  }

  onIngredientSelected(index:number){
     this.store.dispatch(new ShoppingListActions.EditIngredientAction(index));
     // this.shoppingListService.ingredientSelectedEmitter.next(index);
  }

}
