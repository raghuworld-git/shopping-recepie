import {  Injectable } from "@angular/core";
import {Subject} from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
    
    updatedIngredientsListEM = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients:Ingredient[]=[
        new Ingredient("Egg",1),
        new Ingredient("Apple",2),
        new Ingredient("Orange",3)
      ];

      getIngredients():Ingredient[]{
          return this.ingredients.slice();
      }

      getIngredient(index:number):Ingredient{
          return this.ingredients[index];
      }
        
      addIngredient(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.updatedIngredientsListEM.next(this.ingredients.slice());
      }

      addToShoppingList(ing:Ingredient[]):void{
        this.ingredients.push(...ing);
        this.updatedIngredientsListEM.next(this.ingredients.slice());
      }

      updateIngredient (index:number,newIngredient:Ingredient){
          this.ingredients[index]=newIngredient;
          this.updatedIngredientsListEM.next(this.ingredients.slice());
      }

      deleteIngredient(index:number):void{
          this.ingredients.splice(index,1);
          this.updatedIngredientsListEM.next(this.ingredients.slice());
      }
      
}