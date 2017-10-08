import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../model/ingredient.model';

export interface State{
    ingredients:Ingredient[];
    editIngredient : Ingredient;
    editIngredientIndex : number;
}


const initialState : State = {
   ingredients : [
        new Ingredient("Apple",10),
        new Ingredient("Orange",20)
    ],
    editIngredient: null,
    editIngredientIndex : -1
};

export function shoppingListReducer(state = initialState
                                        ,action:ShoppingListActions.ShoppingListActions){
  
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:{
            return {
                 ...state , 
                 ingredients : [...state.ingredients , action.payload]
            }
        }
        case ShoppingListActions.ADD_INGREDIENTS:{
            return {
                ...state,
                ingredients : [...state.ingredients , ...action.payload]
            }
        }
        case ShoppingListActions.UPDATE_INGREDIENT:{
            
            const ingredient = state.ingredients[state.editIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients : ingredients,
                editIngredient: null,
                editIngredientIndex : -1
            }
            
        }
        case ShoppingListActions.DELETE_INGREDIENT:{
            const ingredients = [...state.ingredients];
            ingredients.splice(state.editIngredientIndex,1);

            return {
                ...state,
                ingredients:ingredients,
                editIngredient: null,
                editIngredientIndex : -1
            }
        }
        case ShoppingListActions.EDIT_INGREDIENT:{
            return {
                ...state , 
                editIngredient : {...state.ingredients[action.payload]},
                editIngredientIndex : action.payload
            }
        }
        case ShoppingListActions.RESET_INGREDIENT:{
            return {
                ...state , 
                editIngredient : null,
                editIngredientIndex : -1
            }
        }
        default: {
            return state;
        }
    }                                        
}