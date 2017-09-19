import { NgModule } from '@angular/core';

import { HeaderComponentComponent } from './header-component/header-component.component';
import { HomeComponent } from './home/home.component';
import { AppRouterModule } from './../modules/app-router.module';
import { SharedModule } from './../modules/shared.module';
import { HttpService } from '../services/http-service.service';
import { AuthService } from '../services/auth-service.service';
import { RecipeListService } from '../services/recipe-list.service';
import {ShoppingListService} from '../services/shoppint-list.service';

@NgModule({
  declarations:[
    HeaderComponentComponent,
    HomeComponent
  ],

  imports:[
    SharedModule,
    AppRouterModule
  ],

  exports:[
    HeaderComponentComponent,
    HomeComponent,
    AppRouterModule
  ],
  providers :[ShoppingListService,
              RecipeListService , 
              HttpService , 
              AuthService]
})
export class CoreModule{

}