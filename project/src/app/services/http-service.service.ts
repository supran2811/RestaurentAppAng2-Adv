import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import * as fromApp from '../../app/store/app.reducer';
import * as fromAuthState from '../auth/store/auth.reducer';

@Injectable()
export class HttpService{
    
    constructor(private http:HttpClient,
                    private store:Store<fromApp.AppState>){}
    
  

    save(url:string , data:any[]){
    
        return this.http.put(url, data
               ,{observe:"events"}); 
    }

    get<T>(url:string){
       // const token = this.authService.getToken();
         return this.http.get<T>(url).map(
            (data) => {
               return data;
            }
         );
    }
}