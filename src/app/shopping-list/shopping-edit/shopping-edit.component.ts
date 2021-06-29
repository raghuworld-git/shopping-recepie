import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f',{static:false}) shopListForm:NgForm;
  subscription:Subscription;
  editMode:boolean=false;
  editedItemIndex :number;
  editedItem : Ingredient;

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.shopListForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount});
    });
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onAddItem(form:NgForm):void{
    const formControlValues = form.value;
    const newIngredient = new Ingredient(formControlValues.name,formControlValues.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.shopListForm.reset();
  }

  onClear():void{
    this.shopListForm.reset();
    this.editMode=false;
  }

  onDelete():void{
    this.onClear();
    this.shoppingService.deleteIngredient(this.editedItemIndex);
  }
}
