import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients= this.shoppingService.getIngredients();
    this.shoppingService.updatedIngredientsListEM.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    });
  }

  onEditItem(index:number):void{
    this.shoppingService.startedEditing.next(index);
  }

}
