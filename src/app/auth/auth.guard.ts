import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

    constructor(private _authService:AuthService,private _route:Router){}

    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
              return  this._authService.user.pipe(take(1),map(data=>{
                   const isAuth = !!data;
                   if(isAuth){
                       return isAuth
                   }
                   
                    this._route.createUrlTree(['/auth']);
                }))
    }
}