import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import * as fromApp from '../../app/store/app.reducer';
import * as fromAuthState from '../auth/store/auth.reducer';

@Injectable()
export class HttpService{
    
    constructor(private http:Http,
                    private store:Store<fromApp.AppState>){}
    
  

    save(url:string , data:any[]){
        //const token = this.authService.getToken();
        return this.store.select('auth')
            .take(1).switchMap((authState : fromAuthState.State)=>{
               return this.http.put(url+"?auth="+authState.token , data); 
        })
    }

    get(url:string){
       // const token = this.authService.getToken();
       return this.store.select('auth').take(1).switchMap((authState:fromAuthState.State)=>{
           console.log(authState);
         return this.http.get(url+"?auth="+authState.token).map(
            (response:Response) => {
                const data  = response.json();
                return data;
            }
         )    
       });
    }
}