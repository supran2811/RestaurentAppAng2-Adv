import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Effect,Actions } from '@ngrx/effects';
import * as firebase from 'firebase';

import * as fromAuthState from './auth.reducer';
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffect{
 @Effect() signUp = this.actions$
                            .ofType(AuthActions.DO_SIGNUP)
                            .map((action:AuthActions.DoSignupAction) => {
                                return action.payload }
                            )
                            .switchMap( (authData:{username:string , password:string}) => {
                                return firebase.auth().createUserWithEmailAndPassword(authData.username , authData.password);
                            } )
                            .switchMap(() => {
                                  return fromPromise(firebase.auth().currentUser.getIdToken());
                            })
                            .mergeMap((token:string) => {
                                this.router.navigate(['/']);    
                                return [
                                    {
                                        type : AuthActions.SET_TOKEN,
                                        payload: token
                                    },
                                    {
                                        type:AuthActions.SIGNUP
                                    }
                                ]
                            });

 @Effect() signIn = this.actions$.ofType(AuthActions.DO_SIGNIN)
                                            .map( (action:AuthActions.DoSignInAction) => {
                                                 return action.payload;
                                            } )
                                            .switchMap((authData:{username:string , password:string}) => {
                                                 return firebase.auth().signInWithEmailAndPassword(authData.username,authData.password);
                                            })
                                            .switchMap(() => {
                                                 return fromPromise(firebase.auth().currentUser.getIdToken());
                                            })
                                            .mergeMap((token : string) => {
                                                this.router.navigate(['/']);
                                                return [
                                                    {
                                                        type : AuthActions.SET_TOKEN ,
                                                        payload:token
                                                    },
                                                    {
                                                        type : AuthActions.SIGNIN
                                                    }
                                                ];    
                                            });
 
 @Effect({dispatch:false}) signOut = this.actions$.ofType(AuthActions.SIGNOUT)
                                     .do(() => {
                                         firebase.auth().signOut();
                                         this.router.navigate(['signIn']);
                                     })                                           
                                              
 constructor(private actions$ : Actions , private router:Router){}
}