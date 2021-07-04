import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform  {
    transform(value:any,currencyType?:string):any{
        if(currencyType){
            return `${value} ${currencyType}`;
        }
        else 
            return value;
    }
}