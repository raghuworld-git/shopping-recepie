import { Directive, ElementRef, HostBinding, HostListener, OnInit, Output, Renderer2 } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropDownDirective {

    constructor(private eleRef:ElementRef){

    }
  @HostBinding('class.open') isOpen:boolean = false;

    @HostListener('document:click',['$event']) toggleOpen (event:Event){
        this.isOpen=this.eleRef.nativeElement.contains(event.target);        
   }    
}