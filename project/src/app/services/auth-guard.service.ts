import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService : AuthService , private router:Router){}

    canActivate(router:ActivatedRouteSnapshot,
                    state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

             if(this.authService.isAuthenticated()){
                 return true;
             }           
             else{
                  this.router.navigate(['/signIn']);  
             }

     }
}