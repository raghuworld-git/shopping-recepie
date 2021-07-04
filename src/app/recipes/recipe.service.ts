import {  Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingService:ShoppingListService){}

    private recipes:Recipe[]=[];

      recipeSelected = new Subject<Recipe>();
      
      setRecipes(recipes:Recipe[]):void{
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

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