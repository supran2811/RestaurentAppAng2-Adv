import { RecipeRouterModule } from './recipe-router.module';
import { SharedModule } from './../modules/shared.module';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from './../directives/drop-down.directive';
import { AppRouterModule } from './../modules/app-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeComponent } from './recipe.component';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
    declarations:[
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipeComponent,
        RecipeEditComponent,
        NoRecipeSelectedComponent
    ],
    imports:[
        SharedModule,
        ReactiveFormsModule ,
        RecipeRouterModule 
    ]
})
export class RecipeModule{}