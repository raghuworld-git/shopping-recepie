import {Component, EventEmitter, Output} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{   

    constructor(private dataStorageService:DataStorageService){}

    collapsed:boolean=true;

    onSaveData():void{
        this.dataStorageService.storeRecipies();
    }

    onFetchData():void{
        this.dataStorageService.fetchRecipes().subscribe();
    }
}