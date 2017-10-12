import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    public constructor(private store:Store<fromApp.AppState>){}
    
    
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        console.log("Intercepting :");
        console.log(req);
       return this.store.select("auth").take(1).map((auth:fromAuth.State)=>{
           console.log(auth.token);
           return auth.token;
       }).switchMap((token)=>{
           console.log("My token =>"+token);
           const clonedReq  = req.clone({params:req.params.set("auth",token)});
           return next.handle(clonedReq);
       });
    }
}