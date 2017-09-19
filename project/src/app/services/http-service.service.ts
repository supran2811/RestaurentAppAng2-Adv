import { AuthService } from './auth-service.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class HttpService{
    
    constructor(private http:Http,
                    private authService:AuthService){}
    
    save(url:string , data:any[]){
        const token = this.authService.getToken();
        return this.http.put(url+"?auth="+token , data);
    }

    get(url:string){
        const token = this.authService.getToken();
       return this.http.get(url+"?auth="+token).map(
             (response:Response) => {
                 const data  = response.json();
                 return data;
             }
       );
    }
}