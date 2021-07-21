
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouter } from "./shopping-list-router.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[FormsModule,RouterModule,ShoppingListRouter,SharedModule]   
})
export class ShoppingListModule {

}