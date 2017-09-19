import { CommonModule } from '@angular/common';
import { AuthRouterModule } from './auth-router.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  declarations:[
    SignupFormComponent,
    SigninFormComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    AuthRouterModule
  ]
})
export class AuthModule {

}