import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {throwError} from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class AuthService {
    
    user = new BehaviorSubject<User>(null);
    

    constructor(private http:HttpClient, private router:Router){}

    private API_KEY:string="AIzaSyDPgS83gqZ2xYDaX_jPxZzFWLnfsExEJFw";
    private userLocalStorageKey:string="userData";
    private tokenExpirationTimer :any;

    private postSignUpRequestURL:string=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

    private postSignInRequestURL:string=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;


    signup(email:string,password:string):Observable<AuthSignUpResponseData>{
       return this.http.post<AuthSignUpResponseData>(this.postSignUpRequestURL,{email:email,password:password,returnSecureToken:true}).pipe(catchError(this.errorFunction),
       tap(this.tapFunction));
    }

    login(email:string,password:string):Observable<AuthSingInResponseData>{
     return   this.http.post<AuthSingInResponseData>(this.postSignInRequestURL,{email:email,password:password,returnSecureToken:true})
     .pipe(catchError(this.errorFunction),tap(this.tapFunction));
    }

    logout():void{
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem(this.userLocalStorageKey);
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autLogin(){
        const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} = JSON.parse(localStorage.getItem(this.userLocalStorageKey));
        if(!userData){
            return ;
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration =new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }       
    }

    autoLogout(expirationDuration:number){
       this.tokenExpirationTimer=  setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }

    tapFunction = (resData)=>{
        const expirationDate =new Date(new Date().getTime()+ +resData.expiresIn * 1000);
        const userData = new User(resData.email,resData.localId,resData.idToken,expirationDate);
        this.user.next(userData);
        this.autoLogout(resData.expiresIn * 1000);
        localStorage.setItem(this.userLocalStorageKey,JSON.stringify(userData));
    }

    errorFunction =(errorRes)=>{
        let errorMessage = "An unknown error occured while signing up..!!";
           if(!errorRes.error || !errorRes.error.error){
                   return throwError(errorRes);
           }
            switch(errorRes.error.error.message){
                case'EMAIL_EXISTS':
                    errorMessage="This email already exists.";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage="This email is not found.";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage="Entered email or password is incorrect.";
                    break;
            }
            return throwError(errorMessage);
    }
}

 

interface AuthSignUpResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

interface AuthSingInResponseData extends AuthSignUpResponseData{    
    registered:boolean;
}