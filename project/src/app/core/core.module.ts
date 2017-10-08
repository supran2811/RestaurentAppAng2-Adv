import { NgModule } from '@angular/core';

import { HeaderComponentComponent } from './header-component/header-component.component';
import { HomeComponent } from './home/home.component';
import { AppRouterModule } from './../modules/app-router.module';
import { SharedModule } from './../modules/shared.module';
import { HttpService } from '../services/http-service.service';




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
  providers :[HttpService]
})
export class CoreModule{

}