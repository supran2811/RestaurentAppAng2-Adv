import { AuthGuardDeactivate } from './../services/auth-guard-deactivate.service';
import { AuthGuard } from './../services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipeEditComponent } from './../recipe/recipe-edit/recipe-edit.component';
import { NoRecipeSelectedComponent } from '../recipe/no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailsComponent } from '../recipe/recipe-details/recipe-details.component';
import { RecipeComponent } from '../recipe/recipe.component';

const recipeRoutes:Routes =[
    {
        path:'' , component:RecipeComponent  , children :[
            {path:'new' , component:RecipeEditComponent , canActivate :[AuthGuard],canDeactivate:[AuthGuardDeactivate]},
            {path: ':id/edit' , component:RecipeEditComponent,canActivate :[AuthGuard]
                                                    ,canDeactivate:[AuthGuardDeactivate]},
            {path:':id' , component:RecipeDetailsComponent},
            {path:'' , component:NoRecipeSelectedComponent}
        ]
    }
]
@NgModule({
   imports:[
       RouterModule.forChild(recipeRoutes)
   ],
   exports:[
        RouterModule
   ],
   providers:[
       AuthGuard,
       AuthGuardDeactivate
   ]
})
export class RecipeRouterModule {

}