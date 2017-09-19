import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../model/ingredient.model';
import {ShoppingListService} from '../services/shoppint-list.service';
import { animate, Component, OnDestroy, OnInit, style, transition, trigger } from '@angular/core';

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
  
  ingredients : Ingredient[];
  ingredientAddedSubscription : Subscription;

  constructor(private shoppingListService  : ShoppingListService) { }

  ngOnInit() {
   this.ingredients = this.shoppingListService.getIngredients();
   this.ingredientAddedSubscription = this.shoppingListService.ingredientsAddedEmitter.subscribe(
     (ingredients:Ingredient[]) => {this.ingredients = ingredients;}
   );
  }

  ngOnDestroy(){
    this.ingredientAddedSubscription.unsubscribe();
  }

  onIngredientSelected(index:number){
   
      this.shoppingListService.ingredientSelectedEmitter.next(index);
  }

}
