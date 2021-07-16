import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService {
    
    constructor(private http:HttpClient){}
    private API_KEY:string="AIzaSyDPgS83gqZ2xYDaX_jPxZzFWLnfsExEJFw";
    private postRequestURL:string=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

    signup(email:string,password:string):Observable<AuthResponseData>{
       return this.http.post<AuthResponseData>(this.postRequestURL,{email:email,password:password,returnSecureToken:true});
    }
}

interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string
}