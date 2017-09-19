import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SigninFormComponent } from './../auth/signin-form/signin-form.component';
import { SignupFormComponent } from './../auth/signup-form/signup-form.component';


const authRoutes : Routes = [
    {
        path:'signUp' , component:SignupFormComponent
    },
    {
        path:'signIn' , component:SigninFormComponent
    }
]


@NgModule({
   imports : [
       RouterModule.forChild(authRoutes)
   ],
   exports:[
       RouterModule
   ]
})
export class AuthRouterModule {

}