import { Directive, 
         HostListener , 
         HostBinding ,  
         } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective{
  
   @HostBinding('class.open') open : boolean = false;

  constructor() { }


  @HostListener('click') toggleOpen(){
    this.open = !this.open;
  }
  
}
