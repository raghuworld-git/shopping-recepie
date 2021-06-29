import {  Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingService:ShoppingListService){}

    private recipes:Recipe[]=[
        new Recipe("A Test Recipe","Test description","https://images.unsplash.com/photo-1547496502-affa22d38842?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=884&q=80",[
            new Ingredient('Meet',1),
            new Ingredient('French fries',20)
        ]),
        new Recipe("A Burger Recipe","burger description","https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",[
            new Ingredient('Bun',2),
            new Ingredient('Chicken',4)
        ])
      ];

      recipeSelected = new Subject<Recipe>();
      
      getRecipies():Recipe[]{
          return this.recipes.slice();
      }

      addToShoppingList(ing:Ingredient[]):void{
        this.shoppingService.addToShoppingList(ing);
      }

      getRecipesById(id:number):Recipe{
        return this.recipes[id];
      }

      addRecipe(newRecipe:Recipe):void{
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,updatedRecipe:Recipe):void{
        this.recipes[index]=updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number):void{
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
      
}