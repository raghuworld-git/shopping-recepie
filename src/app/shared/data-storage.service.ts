import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  map, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({providedIn:'root'})
export class DataStorageService  {

    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}  

    private baseURL:string = "https://shopping-list-udemy-angular-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json";

    storeRecipies():void{
        const recipies:Recipe[] = this.recipeService.getRecipies();
        this.http.put(this.baseURL,recipies).subscribe((response)=>{
            console.log(response);
        });
    }

    fetchRecipes(){      
            return this.http.get<Recipe[]>(this.baseURL).pipe(           
                map((recipes)=>{
                    return recipes.map(recipe => {
                        return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }), tap(recipes=>{
                    this.recipeService.setRecipes(recipes);
        }));         
    }
}