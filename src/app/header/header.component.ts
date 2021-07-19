import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{   

    constructor(private dataStorageService:DataStorageService,private authservice:AuthService){}

    collapsed:boolean=true;
    private userSub:Subscription;
    isAuthenticated=false;

    ngOnInit():void{
        this.userSub = this.authservice.user.subscribe(user=>{
            this.isAuthenticated = !user ? false: true;
            console.log(this.isAuthenticated);
        });
    }

    logout():void{
        this.authservice.logout();
    }

    onSaveData():void{
        this.dataStorageService.storeRecipies();
    }

    onFetchData():void{
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy():void{
        this.userSub.unsubscribe();
    }
}