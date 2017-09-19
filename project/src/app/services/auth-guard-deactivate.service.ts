import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

export interface CanComponentDeactivate{
    canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean;
}

export class AuthGuardDeactivate implements CanDeactivate<CanComponentDeactivate>{
     canDeactivate(component:CanComponentDeactivate,
                    currentRoute:ActivatedRouteSnapshot,
                    currentState:RouterStateSnapshot,
                    nextState:RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{

                
                  return component.canDeactivate();      
     }

}