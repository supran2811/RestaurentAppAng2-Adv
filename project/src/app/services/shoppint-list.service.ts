import { Subject } from 'rxjs/Subject';



import { Ingredient } from '../model/ingredient.model';

export class ShoppingListService {
  
  private  ingredients : Ingredient[] = [
      new Ingredient("Apple",10),
      new Ingredient("Orange",20)
  ];
  
  ingredientsAddedEmitter = new Subject<Ingredient[]>();
  ingredientSelectedEmitter = new Subject<number>();

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

 addIngredient(newIngredient:Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsAddedEmitter.next(this.ingredients.slice());
  }

  addIngredients(newIngredients:Ingredient[]){
    this.ingredients.push(...newIngredients);
    this.ingredientsAddedEmitter.next(this.ingredients.slice());
  }

  updateIngredient(ingredientToUpdate : Ingredient , index:number){
      this.ingredients[index] = ingredientToUpdate;
      this.ingredientsAddedEmitter.next(this.ingredients.slice());
  }

   removeIngredient(index:number){
     this.ingredients.splice(index,1);
     this.ingredientsAddedEmitter.next(this.ingredients.slice());
   }
}