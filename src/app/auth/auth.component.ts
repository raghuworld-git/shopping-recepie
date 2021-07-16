import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{

    constructor(private _authService:AuthService){}

    isLoginMode:boolean=true;
    unsubSubscribe:Subscription;
    isLoading : boolean=false;
    erroor:string=null;

    onSwitchMode():void{
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(form:NgForm):void{
        
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        if(this.isLoginMode){

        }
        else{
          this.unsubSubscribe = this._authService.signup(email,password).subscribe((resData)=>{
                console.log(resData);
                this.isLoading = false;
            },(error)=>{
                console.log(error);
                this.erroor="An error occured !!!";
                this.isLoading = false;
            });
        }
        form.reset();
    }

    ngOnDestroy():void{
        this.unsubSubscribe.unsubscribe();
    }
}