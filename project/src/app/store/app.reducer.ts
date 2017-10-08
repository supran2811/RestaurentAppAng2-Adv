import { ActionReducerMap } from '@ngrx/store';


import * as fromShoppingList from '../shopping-list/store/shoppint-list.reducer'
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    shoppingList : fromShoppingList.State,
    auth : fromAuth.State
}

export const globalReducers : ActionReducerMap<AppState> = {
    shoppingList : fromShoppingList.shoppingListReducer,
    auth : fromAuth.AuthReducer
}