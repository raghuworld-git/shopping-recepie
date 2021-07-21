import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { CurrencyFormatPipe } from "./currencyformat.pipe";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinner,
        PlaceHolderDirective,
        CurrencyFormatPipe,
        DropDownDirective
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,
        LoadingSpinner,
        PlaceHolderDirective,
        CurrencyFormatPipe,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule {

}