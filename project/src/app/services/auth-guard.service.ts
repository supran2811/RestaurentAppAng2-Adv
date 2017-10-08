
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRoute, 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router, 
    RouterStateSnapshot } from '@angular/router';
    


import * as fromApp from '../../app/store/app.reducer';
import * as fromAuthState from '../auth/store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router:Router
                    , private store:Store<fromApp.AppState>){}



    canActivate(router:ActivatedRouteSnapshot,
                    state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
              
        return this.store.select('auth')
            .take(1)
            .map((authState:fromAuthState.State) => 
        {
              if(authState.authorised == false){
                  this.router.navigate(['signIn']);
              }
              return authState.authorised;                        
             
            
        });

     }
}